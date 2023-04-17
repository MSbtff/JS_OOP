//상품리스트를 렌더링할려면 이 안의 모든게 연결되어 있어야함
const productsList = {
    products: [
        {
            title: 'A Pillow',
            imageurl: 'https://hips.hearstapps.com/hmg-prod/images/ghi-best-pillows-1573668641.png?crop=0.621xw:0.953xh;0.194xw,0.0471xh&resize=980:*',
            description: 'A soft pillow!',
            price: 19.99
        },

        {
            title: 'A Carpet',
            imageurl: 'https://www.maxpixel.net/static/photo/1x/Carpet-Home-Interior-Design-Decor-Decoration-1405402.jpg',
            description: 'A carpet which you might like - or not.',
            price: 89.99
        }
    ],
    render() {
        const renderHook = document.getElementById('app');
        const prodList = document.createElement('ul');
        prodList.className = 'product-list';
        for (const prod of this.products) { //this는 productsList를 가리킴 prodList가 아님
            const prodEl = document.createElement('li'); //li를 만들고
            prodEl.className = 'product-item'
            //이렇게 하면 css에서 .product-item를 적용할 수 있음
            prodEl.innerHTML = `
                <div>
                    <img src="${prod.imageurl}" alt="${prod.title}">
                    <div class= "product-item__content">
                        <h2>${this.title}</h2> 
                        <h3>\$${this.price}</h3>
                        <p>${prod.description}</p>
                        <button>Add to Cart</button>
                </div>
            `;
            prodList.append(prodEl); //ul에 li를 추가함
        }

        renderHook.append(prodList); //app에 ul을 추가함
    }


}

productsList.render();