let links = [];
let generationInterval;
let progress = 0;
let openingInProgress = false; // Track if links are being opened

function generateLinks() {
    console.log("Generating links...");
    
    const aahRadio = document.getElementById('aah');
    const alianceRadio = document.getElementById('aliance');
    const codesTextarea = document.getElementById('codes');
    const codes = codesTextarea.value.split('\n').map(code => code.trim()).filter(code => code.length > 0);

    // Check if an option is selected and if the codes textarea is not empty
    if (!aahRadio.checked && !alianceRadio.checked) {
        alert("Please select an option.");
        return;
    }

    if (codes.length === 0) {
        alert("Please insert codes in the text field.");
        return;
    }

    links = [];
    const totalCodes = codes.length;

    if (aahRadio.checked) {
        codes.forEach(code => {
            links.push(`https://www.aah.co.uk/aahpoint/${code}`);
        });
    }

    if (alianceRadio.checked) {
        codes.forEach(code => {
            links.push(`https://direct.alliance-healthcare.co.uk/uni2/members/orders/productsearch2.asp?search=${code}`);
        });
    }

    console.log("Links generated:", links);

    // Disable the "Open All Links" button until link generation is complete
    document.getElementById('openLinks').disabled = links.length === 0;

    // Simulate progress for link generation
    simulateProgress(totalCodes);
}

function simulateProgress(totalCodes) {
    const progressBar = document.getElementById('progress');
    let generatedCount = 0;

    function incrementProgress() {
        if (generatedCount < totalCodes) {
            generatedCount++;
            progress = (generatedCount / totalCodes) * 100;
            progressBar.style.width = progress + '%';
            console.log("Simulating generation progress:", progress);
        } else {
            clearInterval(generationInterval);
            console.log("Link generation simulated.");
            document.getElementById('openLinks').disabled = false; // Enable the button after simulation
        }
    }

    // Simulate generating links with a delay
    generationInterval = setInterval(incrementProgress, 10); // Update progress every 10 milliseconds
}

function openAllLinks() {
    // Show a confirmation dialog
    const userConfirmed = confirm("Are you sure you want to open all links?");

    if (!userConfirmed) {
        console.log("User canceled the link opening.");
        return; // Exit the function if the user cancels
    }

    console.log("Opening all links...");
    const totalLinks = links.length;
    if (totalLinks === 0) return;

    let currentIndex = 0;

    function openNextLink() {
        if (currentIndex < totalLinks) {
            console.log(`Opening link ${currentIndex + 1}/${totalLinks}: ${links[currentIndex]}`);
            window.open(links[currentIndex], '_blank'); // Opens link in a new tab
            currentIndex++;
            const progress = (currentIndex / totalLinks) * 100;
            updateProgressBar(progress);
            // Increase the delay to reduce the chance of pop-up blockers
            setTimeout(openNextLink, 100); // 0.1 second delay
        } else {
            console.log("All links have been opened.");
        }
    }

    openNextLink();
}

function updateProgressBar(progress) {
    console.log("Updating progress bar to:", progress);
    const progressBar = document.getElementById('progress');
    progressBar.style.width = progress + '%';
}

// Add event listeners after the DOM has loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed.");
    document.getElementById('generateLinks').addEventListener('click', generateLinks);
    document.getElementById('openLinks').addEventListener('click', openAllLinks);
});
