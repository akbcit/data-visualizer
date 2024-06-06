import puppeteer from 'puppeteer';

// Function to generate the Zillow URL
function generateZillowUrl(city: string, maxPrice: number, pageNum: number) {
    return `https://www.zillow.com/${city}/?searchQueryState=%7B%22pagination%22%3A%7B%22currentPage%22%3A${pageNum}%7D%2C%22filterState%22%3A%7B%22price%22%3A%7B%22max%22%3A${maxPrice}%7D%7D%7D`;
}

// Function to scrape HTML content from a given URL
const scrapePageHtml = async (url: string) => {
    try {
        // Launch the browser
        const browser = await puppeteer.launch();
        // Open a new page
        const page = await browser.newPage();
        // Navigate to the URL
        await page.goto(url, { waitUntil: 'load', timeout: 3000 });
        // Scrape the HTML content
        const htmlContent = await page.content();
        // Close the browser
        await browser.close();
        // Return the HTML content
        return htmlContent;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export const scrapeZillow = async (city: string, maxPrice: number, pageNum: number)=>{
    const url = generateZillowUrl(city,maxPrice,pageNum);
    console.log(url);
    const scrapeResponse = await scrapePageHtml(url);
    if(!scrapeResponse){
        throw new Error("unable to scrape");
    }
    else{
        return scrapeResponse;
    }
}


