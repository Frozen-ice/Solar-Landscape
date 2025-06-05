"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const config_1 = __importDefault(require("./config/config"));
const database_1 = __importDefault(require("./models/database"));
const errorHandler_1 = require("./middleware/errorHandler");
const enrollmentRoutes_1 = __importDefault(require("./routes/enrollmentRoutes"));
// Initialize express app
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({
    origin: config_1.default.cors.origin
}));
app.use(body_parser_1.default.json());
// Routes
app.use('/api', enrollmentRoutes_1.default);
// Error handling
app.use(errorHandler_1.errorHandler);
// Start server
const startServer = async () => {
    try {
        // Connect to database
        await database_1.default.connect();
        // Start listening
        app.listen(config_1.default.port, () => {
            console.log(`Server running on port ${config_1.default.port}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
// Handle graceful shutdown
process.on('SIGTERM', async () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    await database_1.default.close();
    process.exit(0);
});
process.on('SIGINT', async () => {
    console.log('SIGINT received. Shutting down gracefully...');
    await database_1.default.close();
    process.exit(0);
});
// Start the server
startServer();
//# sourceMappingURL=index.js.map