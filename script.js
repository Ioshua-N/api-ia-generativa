
async function generateDescription() 
{
    const apiKey = document.getElementById('apiKey').value;
    const product = document.getElementById('product').value;
    const descriptionElement = document.getElementById('description');
    const errorElement = document.getElementById('error');

    descriptionElement.innerText = '';
    errorElement.innerText = '';

    if (!apiKey) 
    {
        alert('Please enter your API key.');
        return;
    }
    if (!product) 
    {
        alert('Please select a product.');
        return;
    }

    const products = 
    {
        "1": 
        {
            "name": "Laptop - High Performance",
            "category": "Electronics",
            "features": "16GB RAM, 512GB SSD, Intel i7"
        },
        "2": 
        {
            "name": "Smartphone - Mid-range",
            "category": "Electronics",
            "features": "6GB RAM, 128GB Storage, Snapdragon Processor"
        },
        "3": 
        {
            "name": "Wireless Headphones - Noise Cancelling",
            "category": "Accessories",
            "features": "Active Noise Cancelling, Bluetooth 5.0, 20h Battery Life"
        },
        "4": 
        {
            "name": "Smartwatch - Fitness Tracker",
            "category": "Wearables",
            "features": "Heart Rate Monitor, GPS, Waterproof"
        }
    };

    const selectedProduct = products[product];
    const prompt = `You are a marketing expert. Write a compelling product description for a ${selectedProduct.name} in the ${selectedProduct.category} category. Highlight its key features: ${selectedProduct.features}. The description should be engaging and suitable for an e-commerce website.`;

    try 
    {
        const response = await fetch('https://api.google.com/v1/gemini/generate', 
        {
            method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(
            {
                prompt: prompt,
                max_tokens: 150
            })
        });

        if (!response.ok) 
        {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();

        if (data.choices && data.choices[0] && data.choices[0].text) 
        {
            descriptionElement.innerText = data.choices[0].text.trim();
        } 
        else 
        {
            throw new Error('Invalid API response format.');
        }
    } 
    catch (error) 
    {
        errorElement.innerText = `Error: ${error.message}`;
    }
}