class Product {  //클래스는 템플릿이라고 생각하면 됨
    title = 'default'; //클래스 필드 없어 됨
    imageurl;
    description;
    price;

    //클래스 속성
    constructor(title, image, desc, price) { //생성자 함수는 클래스의 인스턴스가 생성될때 호출됨
        this.title = title; //this는 클래스의 인스턴스를 가리킴
        this.imageurl = image;
        this.description = desc;
        this.price = price;
    } //생성자 함수

    // someName() {}
    // someName2() {}
}

//상품리스트를 렌더링할려면 이 안의 모든게 연결되어 있어야함
const productsList = {
    products: [
        //new를 쓰면 클래스를 인스턴스화함
        new Product(
            'A Pillow',
            'https://hips.hearstapps.com/hmg-prod/images/ghi-best-pillows-1573668641.png?crop=0.621xw:0.953xh;0.194xw,0.0471xh&resize=980:*',
            'A soft pillow!',
            19.99
        ),

        new Product(
            'A Carpet',
            'https://www.maxpixel.net/static/photo/1x/Carpet-Home-Interior-Design-Decor-Decoration-1405402.jpg',
            'A carpet which you might like - or not.',
            89.99
        ),


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

//객체리터럴 표기법은 데이터를 그룹으로 묶을때는 유용하지만 재사용이 가능한 객체코드를 쓰기 어려움

productsList.render();