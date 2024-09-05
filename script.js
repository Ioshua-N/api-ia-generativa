async function generateDescription() {
    const apiKey = document.getElementById('apiKey').value;
    const product = document.getElementById('product').value;
    const descriptionElement = document.getElementById('description');
    const errorElement = document.getElementById('error');

    descriptionElement.innerText = '';
    errorElement.innerText = '';

    if (!apiKey) {
        alert('Please enter your API key.');
        return;
    }
    if (!product) {
        alert('Please select a product.');
        return;
    }

    const products = {
        "1": {
            "name": "Laptop - GAMER",
            "category": "Electronics",
            "features": "16GB RAM, 512GB SSD, Intel i7"
        },
        "2": {
            "name": "Celular - Nokia Tijolão",
            "category": "Electronics",
            "features": "6GB RAM, 128GB Storage, Snapdragon Processor"
        },
        "3": {
            "name": "Fone Bluetooth - Cancelador de ouvidos",
            "category": "Accessories",
            "features": "Active Noise Cancelling, Bluetooth 5.0, 20h Battery Life"
        },
        "4": {
            "name": "Smartwatch - (PROMOÇÃO Pague 2 Leve 1)",
            "category": "Wearables",
            "features": "Heart Rate Monitor, GPS, Waterproof"
        }
    };

    const selectedProduct = products[product];
    const prompt = `Você é fera no marketing. Escreva uma descrição para um produto muito convincente para um ${selectedProduct.name} na categoria ${selectedProduct.category}. Saliente as características chaves: ${selectedProduct.features}. A descrição deve ser relevante e se enquadrar em um e-commerce website.`;

    try {
        const response = await fetch('http://localhost:3000/proxy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                apiKey: apiKey,
                prompt: prompt
            })
        });

        const data = await response.json();
        
        // Log da resposta para verificar o formato
        console.log(data);

        // Verifique o formato correto para acessar o texto da resposta
        if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0] && data.candidates[0].content.parts[0].text) {
            descriptionElement.innerText = data.candidates[0].content.parts[0].text.trim();
        } else {
            throw new Error('Invalid API response format.');
        }
        
    } catch (error) {
        errorElement.innerText = `Error: ${error.message}`;
    }
}
