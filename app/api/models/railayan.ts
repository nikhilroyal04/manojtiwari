import mongoose from "mongoose";

const chunaviRailayanSchema = new mongoose.Schema({
    title: { type: String, required: false },
    description: { type: String, required: false },
    location: { type: String, required: false },
    state: { type: String, required: false },
    date: { type: Date, required: false },
    time: { type: String, required: false },
    expectedCrowd: { type: Number, required: false },
    status: { type: String, required: false },
    priority: { type: String, required: false },
    campaignType: { type: String, required: false },
    targetAudience: { type: [String], required: false },
    keySpeakers: { type: [String], required: false },
    budget: { type: Number, required: false },
    actualCrowd: { type: Number, required: false },
    feedback: { type: String, required: false },
    photos: [{ type: String, required: false }],
    images: [{ type: String, required: false }],
    mainImage: { type: String, required: false },
    videos: [{ type: String, required: false }],
    createdOn: { type: Date, default: Date.now, required: false },
    updatedOn: { type: Date, default: Date.now, required: false },
});

const ChunaviRailayan = mongoose.models.ChunaviRailayan || mongoose.model('ChunaviRailayan', chunaviRailayanSchema);

export default ChunaviRailayan;
