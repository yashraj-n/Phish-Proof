# Phish Proof
Intelligent Phishing detection system for Chrome. Created at Visionary Hackathon '24 in 8 hours.

### Problem Statement
Design and implement an innovative phishing detection and prevention system that addresses the following key aspects: Cross-Channel Phishing Protection,Phishing Campaign Simulation and Analytics,Real-lime URL Analysis.

## Project Layout


#### api
Contains source code for the backend API (Uses Virustotal and IPQualityScore to determine Fradulent Score of any Website/Email Address).

#### client
Contains source code for the Chrome Extension. The Extension has lot of bugs and needs polishing but it should work out of box without need of much configuration. 

## Running Locally

Prerequisites: Node.js, Vercel CLI(Configured), Chromium Based Browser

```bash
# Clone this Repository
git clone https://github.com/yashraj-n/phisproof

# Change Directory into phisproof/api
cd phisproof/api

# Install dependencies
npm i

# Run the API Locally
vercel dev
```

> :warning: **Make sure you have Virustotal and IPQualityScore API keys configured correctly**. The server will not run without it.

For Client, goto `chrome://extensions` and enable developer mode. Then Drag and Drop the `client` folder onto the browser window. It should install the extension with some manifest warnings.

# Contributors

- [Yashraj Narke](https://github.com/yashraj-n)
- [Ashish Sharma](https://github.com/ASHISH9925)
- [Himanshu Gupta](https://github.com/hmshuv)
- [Vishwesh Bhat](https://github.com/vishweshbhat)

## License
[MIT](LICENSE)