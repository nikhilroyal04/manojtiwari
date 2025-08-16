import mongoose from "mongoose";

const chunaviRailayanSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    state: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String },
    expectedCrowd: { type: Number },
    status: { type: String },
    priority: { type: String },
    campaignType: { type: String },
    targetAudience: { type: [String] },
    keySpeakers: { type: [String] },
    budget: { type: Number },
    actualCrowd: { type: Number },
    feedback: { type: String },
    photos: [{ type: String }],
    images: [{ type: String }],
    mainImage: { type: String, required: true },
    videos: [{ type: String }],
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now },
});

const ChunaviRailayan = mongoose.models.ChunaviRailayan || mongoose.model('ChunaviRailayan', chunaviRailayanSchema);

export default ChunaviRailayan;
