export const productLD = {
    "@context": "http://schema.org/",
    "@type": "Product",
    "name": "Some tech product",
    "image": "http://lorempixel.com/output/technics-q-c-640-480-3.jpg",
    "description": "Descriprion for tech product.",
    "mpn": "123450",
    "brand": {
        "@type": "Thing", "name": "Brand Name"
    },
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 5,
        "reviewCount": 50
    },
    "offers": [
        {
            "@type": "Offer",
            "availability": "InStock",
            "priceCurrency": "USD",
            "price": 9.99,
            "url": "http://lorempixel.com/output/technics-q-c-640-480-0.jpg",
            "sku": 9999,
            "mpn": "123456",
            "priceValidUntil": "2020-07-05T00:00:00.000Z"
        },
        {
            "@type": "Offer",
            "availability": "InStock",
            "priceCurrency": "USD",
            "price": 9.99,
            "url": "http://lorempixel.com/output/technics-q-c-640-480-1.jpg",
            "sku": 9998,
            "mpn": "123457",
            "priceValidUntil": "2020-07-05T00:00:00.000Z"
        },
        {
            "@type": "Offer",
            "availability": "InStock",
            "priceCurrency": "USD",
            "price": 9.99,
            "url": "http://lorempixel.com/output/technics-q-c-640-480-2.jpg",
            "sku": 9997,
            "mpn": "123458",
            "priceValidUntil": "2020-07-05T00:00:00.000Z"
        }
    ],
    "sku": 1234, "review": {
        "@type": "Review",
        "author": "John S.",
        "reviewBody": "Really good product, can't wait to order one more."
    }
}