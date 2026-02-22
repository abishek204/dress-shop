const { exec } = require('child_process');
const http = require('http');

console.log('🔍 Checking your Dress Website setup...');

// Check if Backend is listening
const checkBackend = () => {
    return new Promise((resolve) => {
        const req = http.get('http://localhost:5000/', (res) => {
            console.log('✅ Backend is running on port 5000');
            resolve(true);
        });
        req.on('error', () => {
            console.log('❌ Backend is NOT running on port 5000');
            resolve(false);
        });
        req.end();
    });
};

// Check if Frontend is listening
const checkFrontend = () => {
    return new Promise((resolve) => {
        const req = http.get('http://localhost:5173/', (res) => {
            console.log('✅ Frontend is running on port 5173');
            resolve(true);
        });
        req.on('error', () => {
            console.log('❌ Frontend (Vite) is NOT running on port 5173');
            resolve(false);
        });
        req.end();
    });
};

async function runChecks() {
    const backendUp = await checkBackend();
    const frontendUp = await checkFrontend();

    if (!backendUp || !frontendUp) {
        console.log('\n💡 Tip: Run "npm start" in the root directory to start both.');
    }
}

runChecks();
