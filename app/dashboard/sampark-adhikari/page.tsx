"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Plus, 
  Edit, 
  Eye, 
  User,
  CheckCircle,
  XCircle,
  MoreVertical,
  Trash2,
  MessageSquare,
  FileText,
  Users,
  TrendingUp,
  BarChart3,
  Award,
  Clock
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface SamparkAdhikari {
  id: number;
  name: string;
  email: string;
  number: string;
  officeNumber?: string;
  workArea: string;
  additionalInfo?: string;
  department: string;
  image: string;
  status: 'ACTIVE' | 'INACTIVE' | 'ON_LEAVE' | 'RESIGNED';
  designation: string;
  joiningDate: string;
  experience?: number;
  qualification?: string;
  address?: string;
  emergencyContact?: string;
  notes?: string;
}

export default function SamparkAdhikari() {
  const [officers, setOfficers] = useState<SamparkAdhikari[]>([
    {
      id: 1,
      name: "कृष्णा चौबे (राजा)",
      email: "krishna.choubey@example.com",
      number: "9990152796",
      officeNumber: "(011) 23094122",
      workArea: "मा. सांसद जी के द्वारा जनसमस्याओं के निराकरण हेतु किये जा रहे कार्यों में समर्पण भाव से सहभागिता करना",
      additionalInfo: "एजुकेशनल क्वालिफिकेशन - B.tech (ECE) शुरू से ही सामाजिक कार्य में अभिरुचि रखना",
      department: "जनसमस्या निराकरण",
      image: "/images/staff/krishna-choubey.jpg",
      status: "ACTIVE",
      designation: "सीनियर अधिकारी",
      joiningDate: "2020-01-15",
      experience: 4,
      qualification: "B.Tech (ECE)",
      address: "उत्तर पूर्वी दिल्ली",
      emergencyContact: "9876543210"
    },
    {
      id: 2,
      name: "राजीव वर्मा",
      email: "rajeev.verma@example.com",
      number: "9999535258",
      officeNumber: "(011) 23094122",
      workArea: "मा. सांसद जी के द्वारा जनसमस्याओं के निराकरण हेतु किये जा रहे कार्यों में समर्पण भाव से सहभागिता करना",
      department: "जनसमस्या निराकरण",
      image: "/images/staff/rajeev-verma.jpg",
      status: "ACTIVE",
      designation: "अधिकारी",
      joiningDate: "2021-03-20",
      experience: 3,
      qualification: "M.A. (Political Science)",
      address: "दिल्ली",
      emergencyContact: "8765432109"
    },
    {
      id: 3,
      name: "राजकुमार श्रीवास्तव",
      email: "rajkumar.srivastava@example.com",
      number: "098735 88120",
      workArea: "सांसद जी के सहयोग आवर जन समस्या समादन में सहयोग करते हैं",
      department: "जन समस्या समाधान",
      image: "/images/staff/rajkumar-srivastava.jpg",
      status: "ACTIVE",
      designation: "सहायक अधिकारी",
      joiningDate: "2022-06-10",
      experience: 2,
      qualification: "B.A. (Public Administration)",
      address: "उत्तर पूर्वी दिल्ली",
      emergencyContact: "7654321098"
    },
    {
      id: 4,
      name: "अमित शर्मा",
      email: "amit.sharma@example.com",
      number: "9876543210",
      workArea: "सोशल मीडिया प्रबंधन और डिजिटल कम्युनिकेशन",
      department: "मीडिया",
      image: "/images/staff/amit-sharma.jpg",
      status: "ACTIVE",
      designation: "मीडिया अधिकारी",
      joiningDate: "2021-08-15",
      experience: 3,
      qualification: "B.Tech (IT)",
      address: "दिल्ली",
      emergencyContact: "6543210987"
    },
    {
      id: 5,
      name: "प्रिया पटेल",
      email: "priya.patel@example.com",
      number: "8765432109",
      workArea: "कार्यक्रम आयोजन और प्रबंधन",
      department: "कार्यक्रम प्रबंधन",
      image: "/images/staff/priya-patel.jpg",
      status: "ON_LEAVE",
      designation: "कार्यक्रम अधिकारी",
      joiningDate: "2022-01-10",
      experience: 2,
      qualification: "M.B.A. (Event Management)",
      address: "दिल्ली",
      emergencyContact: "5432109876"
    },
    {
      id: 6,
      name: "विनोद यादव",
      email: "vinod.yadav@example.com",
      number: "7654321098",
      workArea: "क्षेत्रीय विकास कार्य और योजनाओं का निरीक्षण",
      department: "क्षेत्रीय विकास",
      image: "/images/staff/vinod-yadav.jpg",
      status: "ACTIVE",
      designation: "विकास अधिकारी",
      joiningDate: "2020-11-05",
      experience: 4,
      qualification: "M.A. (Development Studies)",
      address: "उत्तर पूर्वी दिल्ली",
      emergencyContact: "4321098765"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [selectedOfficer, setSelectedOfficer] = useState<SamparkAdhikari | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newOfficer, setNewOfficer] = useState<Partial<SamparkAdhikari>>({
    name: '',
    email: '',
    number: '',
    officeNumber: '',
    workArea: '',
    department: '',
    image: '',
    status: 'ACTIVE',
    designation: '',
    joiningDate: '',
    experience: 0,
    qualification: '',
    address: '',
    emergencyContact: ''
  });

  const statusColors = {
    ACTIVE: 'bg-green-100 text-green-800 border-green-200',
    INACTIVE: 'bg-gray-100 text-gray-800 border-gray-200',
    ON_LEAVE: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    RESIGNED: 'bg-red-100 text-red-800 border-red-200'
  };

  const statusIcons = {
    ACTIVE: CheckCircle,
    INACTIVE: XCircle,
    ON_LEAVE: Clock,
    RESIGNED: XCircle
  };

  const filteredOfficers = officers.filter(officer => {
    const matchesSearch = 
      officer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      officer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      officer.workArea.toLowerCase().includes(searchTerm.toLowerCase()) ||
      officer.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || officer.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || officer.department === departmentFilter;

    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const handleAddOfficer = () => {
    const officer: SamparkAdhikari = {
      id: Date.now(),
      name: newOfficer.name || '',
      email: newOfficer.email || '',
      number: newOfficer.number || '',
      officeNumber: newOfficer.officeNumber || '',
      workArea: newOfficer.workArea || '',
      additionalInfo: newOfficer.additionalInfo || '',
      department: newOfficer.department || '',
      image: newOfficer.image || '',
      status: newOfficer.status || 'ACTIVE',
      designation: newOfficer.designation || '',
      joiningDate: newOfficer.joiningDate || '',
      experience: newOfficer.experience || 0,
      qualification: newOfficer.qualification || '',
      address: newOfficer.address || '',
      emergencyContact: newOfficer.emergencyContact || ''
    };
    
    setOfficers(prev => [officer, ...prev]);
    setNewOfficer({
      name: '',
      email: '',
      number: '',
      officeNumber: '',
      workArea: '',
      department: '',
      image: '',
      status: 'ACTIVE',
      designation: '',
      joiningDate: '',
      experience: 0,
      qualification: '',
      address: '',
      emergencyContact: ''
    });
    setIsAddModalOpen(false);
  };

  const handleDeleteOfficer = (id: number) => {
    setOfficers(prev => prev.filter(officer => officer.id !== id));
    setIsDeleteModalOpen(false);
    setSelectedOfficer(null);
  };

  const getStatusCount = (status: string) => {
    return officers.filter(officer => status === 'all' ? true : officer.status === status).length;
  };

  const getDepartmentCount = (department: string) => {
    return officers.filter(officer => department === 'all' ? true : officer.department === department).length;
  };

  const totalExperience = officers.reduce((sum, officer) => sum + (officer.experience || 0), 0);
  const departments = Array.from(new Set(officers.map(officer => officer.department)));

  return (
    <div className="min-h-screen">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">संपर्क अधिकारी प्रबंधन</h1>
          <p className="text-gray-600">Manage and track all contact officers and staff members</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
          {[
            { label: 'Total Officers', count: officers.length, color: 'bg-blue-500', icon: Users },
            { label: 'Active', count: getStatusCount('ACTIVE'), color: 'bg-green-500', icon: CheckCircle },
            { label: 'On Leave', count: getStatusCount('ON_LEAVE'), color: 'bg-yellow-500', icon: Clock },
            { label: 'Inactive', count: getStatusCount('INACTIVE'), color: 'bg-gray-500', icon: XCircle },
            { label: 'Resigned', count: getStatusCount('RESIGNED'), color: 'bg-red-500', icon: XCircle },
            { label: 'Total Experience', count: totalExperience, color: 'bg-purple-500', icon: Award }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
                </div>
                <div className={`w-8 h-8 rounded-full ${stat.color} opacity-20 flex items-center justify-center`}>
                  <stat.icon className="w-4 h-4 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Departments</h3>
              <BarChart3 className="w-6 h-6 text-blue-500" />
            </div>
            <div className="space-y-3">
              {departments.map(dept => (
                <div key={dept} className="flex justify-between">
                  <span className="text-gray-600">{dept}:</span>
                  <span className="font-semibold">
                    {getDepartmentCount(dept)}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Experience Overview</h3>
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Average Experience:</span>
                <span className="font-semibold text-blue-600">
                  {Math.round(totalExperience / officers.length)} years
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Most Experienced:</span>
                <span className="font-semibold text-green-600">
                  {Math.max(...officers.map(o => o.experience || 0))} years
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Newest Member:</span>
                <span className="font-semibold text-orange-600">
                  {Math.min(...officers.map(o => o.experience || 0))} years
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              <MoreVertical className="w-6 h-6 text-gray-500" />
            </div>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <User className="w-4 h-4 mr-2" />
                Add New Officer
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <MessageSquare className="w-4 h-4 mr-2" />
                Send Notifications
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search officers by name, email, work area, or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="ON_LEAVE">On Leave</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
                <SelectItem value="RESIGNED">Resigned</SelectItem>
              </SelectContent>
            </Select>

            {/* Department Filter */}
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Add Officer Button */}
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <Plus className="w-4 h-4" />
                  Add Officer
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Contact Officer</DialogTitle>
                  <DialogDescription>
                    Create a new contact officer profile with all details.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Name</label>
                      <Input
                        value={newOfficer.name}
                        onChange={(e) => setNewOfficer(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter officer name"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <Input
                        type="email"
                        value={newOfficer.email}
                        onChange={(e) => setNewOfficer(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="Enter email"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Phone Number</label>
                      <Input
                        value={newOfficer.number}
                        onChange={(e) => setNewOfficer(prev => ({ ...prev, number: e.target.value }))}
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Office Number</label>
                      <Input
                        value={newOfficer.officeNumber}
                        onChange={(e) => setNewOfficer(prev => ({ ...prev, officeNumber: e.target.value }))}
                        placeholder="Enter office number"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Work Area</label>
                    <textarea
                      value={newOfficer.workArea}
                      onChange={(e) => setNewOfficer(prev => ({ ...prev, workArea: e.target.value }))}
                      placeholder="Enter work area description"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium">Department</label>
                      <Input
                        value={newOfficer.department}
                        onChange={(e) => setNewOfficer(prev => ({ ...prev, department: e.target.value }))}
                        placeholder="Enter department"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Designation</label>
                      <Input
                        value={newOfficer.designation}
                        onChange={(e) => setNewOfficer(prev => ({ ...prev, designation: e.target.value }))}
                        placeholder="Enter designation"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Status</label>
                      <Select value={newOfficer.status} onValueChange={(value) => setNewOfficer(prev => ({ ...prev, status: value as SamparkAdhikari['status'] }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ACTIVE">Active</SelectItem>
                          <SelectItem value="ON_LEAVE">On Leave</SelectItem>
                          <SelectItem value="INACTIVE">Inactive</SelectItem>
                          <SelectItem value="RESIGNED">Resigned</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Joining Date</label>
                      <Input
                        type="date"
                        value={newOfficer.joiningDate}
                        onChange={(e) => setNewOfficer(prev => ({ ...prev, joiningDate: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Experience (Years)</label>
                      <Input
                        type="number"
                        value={newOfficer.experience}
                        onChange={(e) => setNewOfficer(prev => ({ ...prev, experience: parseInt(e.target.value) || 0 }))}
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Qualification</label>
                    <Input
                      value={newOfficer.qualification}
                      onChange={(e) => setNewOfficer(prev => ({ ...prev, qualification: e.target.value }))}
                      placeholder="Enter qualification"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Address</label>
                    <Input
                      value={newOfficer.address}
                      onChange={(e) => setNewOfficer(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="Enter address"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Emergency Contact</label>
                    <Input
                      value={newOfficer.emergencyContact}
                      onChange={(e) => setNewOfficer(prev => ({ ...prev, emergencyContact: e.target.value }))}
                      placeholder="Enter emergency contact"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Image URL</label>
                    <Input
                      value={newOfficer.image}
                      onChange={(e) => setNewOfficer(prev => ({ ...prev, image: e.target.value }))}
                      placeholder="Enter image URL"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddOfficer} className="bg-orange-500 hover:bg-orange-600">
                    Add Officer
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Officers Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Officer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOfficers.map((officer, index) => (
                  <motion.tr
                    key={officer.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          <User className="w-6 h-6 text-orange-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{officer.name}</div>
                          <div className="text-sm text-gray-500">{officer.designation}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{officer.email}</div>
                      <div className="text-sm text-gray-500">{officer.number}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{officer.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={statusColors[officer.status]}>
                        {React.createElement(statusIcons[officer.status], { className: "w-3 h-3" })}
                        {officer.status.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{officer.experience || 0} years</div>
                      <div className="text-sm text-gray-500">Since {new Date(officer.joiningDate).getFullYear()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        {/* View Officer */}
                        <Dialog open={isViewModalOpen && selectedOfficer?.id === officer.id} onOpenChange={(open) => {
                          setIsViewModalOpen(open);
                          if (open) setSelectedOfficer(officer);
                          else setSelectedOfficer(null);
                        }}>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>Officer Details</DialogTitle>
                              <DialogDescription>
                                Complete information about {officer.name}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Name</label>
                                  <p className="text-sm text-gray-900">{officer.name}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Designation</label>
                                  <p className="text-sm text-gray-900">{officer.designation}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Department</label>
                                  <p className="text-sm text-gray-900">{officer.department}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Status</label>
                                  <Badge className={statusColors[officer.status]}>
                                    {officer.status.replace('_', ' ')}
                                  </Badge>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Email</label>
                                  <p className="text-sm text-gray-900">{officer.email}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Phone</label>
                                  <p className="text-sm text-gray-900">{officer.number}</p>
                                </div>
                                {officer.officeNumber && (
                                  <div>
                                    <label className="text-sm font-medium text-gray-500">Office Number</label>
                                    <p className="text-sm text-gray-900">{officer.officeNumber}</p>
                                  </div>
                                )}
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Joining Date</label>
                                  <p className="text-sm text-gray-900">{new Date(officer.joiningDate).toLocaleDateString()}</p>
                                </div>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-500">Work Area</label>
                                <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">{officer.workArea}</p>
                              </div>
                              {officer.additionalInfo && (
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Additional Info</label>
                                  <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">{officer.additionalInfo}</p>
                                </div>
                              )}
                              <div className="grid grid-cols-3 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Experience</label>
                                  <p className="text-sm text-gray-900">{officer.experience || 0} years</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Qualification</label>
                                  <p className="text-sm text-gray-900">{officer.qualification}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Emergency Contact</label>
                                  <p className="text-sm text-gray-900">{officer.emergencyContact}</p>
                                </div>
                              </div>
                              {officer.address && (
                                <div>
                                  <label className="text-sm font-medium text-gray-500">Address</label>
                                  <p className="text-sm text-gray-900">{officer.address}</p>
                                </div>
                              )}
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                                Close
                              </Button>
                              <Button 
                                onClick={() => {
                                  setIsViewModalOpen(false);
                                  setSelectedOfficer(officer);
                                  setIsEditModalOpen(true);
                                }}
                                className="bg-primary hover:bg-primary/90"
                              >
                                Edit Officer
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        {/* Edit Officer */}
                        <Dialog open={isEditModalOpen && selectedOfficer?.id === officer.id} onOpenChange={(open) => {
                          setIsEditModalOpen(open);
                          if (open) setSelectedOfficer(officer);
                          else setSelectedOfficer(null);
                        }}>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Edit Officer</DialogTitle>
                              <DialogDescription>
                                Update the details for {officer.name}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <label className="text-sm font-medium">Name</label>
                                <Input
                                  value={officer.name}
                                  onChange={(e) => {
                                    setOfficers(prev => prev.map(o => 
                                      o.id === officer.id ? { ...o, name: e.target.value } : o
                                    ));
                                  }}
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Status</label>
                                  <Select 
                                    value={officer.status} 
                                    onValueChange={(value) => {
                                      setOfficers(prev => prev.map(o => 
                                        o.id === officer.id ? { ...o, status: value as SamparkAdhikari['status'] } : o
                                      ));
                                    }}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="ACTIVE">Active</SelectItem>
                                      <SelectItem value="ON_LEAVE">On Leave</SelectItem>
                                      <SelectItem value="INACTIVE">Inactive</SelectItem>
                                      <SelectItem value="RESIGNED">Resigned</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Department</label>
                                  <Input
                                    value={officer.department}
                                    onChange={(e) => {
                                      setOfficers(prev => prev.map(o => 
                                        o.id === officer.id ? { ...o, department: e.target.value } : o
                                      ));
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Experience (Years)</label>
                                  <Input
                                    type="number"
                                    value={officer.experience || 0}
                                    onChange={(e) => {
                                      setOfficers(prev => prev.map(o => 
                                        o.id === officer.id ? { ...o, experience: parseInt(e.target.value) || 0 } : o
                                      ));
                                    }}
                                  />
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Designation</label>
                                  <Input
                                    value={officer.designation}
                                    onChange={(e) => {
                                      setOfficers(prev => prev.map(o => 
                                        o.id === officer.id ? { ...o, designation: e.target.value } : o
                                      ));
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                                Cancel
                              </Button>
                              <Button 
                                onClick={() => setIsEditModalOpen(false)}
                                className="bg-primary hover:bg-primary/90"
                              >
                                Update Officer
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        {/* Delete Officer */}
                        <Dialog open={isDeleteModalOpen && selectedOfficer?.id === officer.id} onOpenChange={(open) => {
                          setIsDeleteModalOpen(open);
                          if (open) setSelectedOfficer(officer);
                          else setSelectedOfficer(null);
                        }}>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Delete Officer</DialogTitle>
                              <DialogDescription>
                                Are you sure you want to delete &quot;{officer.name}&quot;? This action cannot be undone.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                                Cancel
                              </Button>
                              <Button 
                                variant="destructive" 
                                onClick={() => handleDeleteOfficer(officer.id)}
                              >
                                Delete Officer
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}