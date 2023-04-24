class Product {  //클래스는 템플릿이라고 생각하면 됨
    // title = 'default'; //클래스 필드 없어 됨
    // imageurl;
    // description;
    // price;

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

class ElementAttribute {
    constructor(attrName, attrValue) {
        this.name = attrName;
        this.value = attrValue;
    }
}

class Component {
    constructor(renderHookId) {
        this.hookId = renderHookId; //hook 프로퍼티는 constructor에서 전달받은 데이터 가짐
    }

    createRootElement(tag, cssClasses, attributes) {
        const rootElement = document.createElement(tag);
        if (cssClasses) {
            rootElement.className = cssClasses;
        } if (attributes && attributes.length > 0) {
            for (const attr of attributes) {
                rootElement.setAttribute(attr.name, attr.value);
            }
        }
        document.getElementById(this.hookId).append(rootElement);
        return rootElement;
    }
}

class ShoppingCart extends Component { //1개의 클래스에서만 확장가능
    //하위 클래스인 경우  생성자가 없으며 상위 클래스의 생성자를 호출해야함
    items = [];

    set cartItems(value) {
        this.items = value; //value가 cartiems의 배열이 됨 기존의 items 배열을 덮어씀
        this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(2)}</h2>`;
        //새로운 cartItems을 설정할 때마다 totalAmout를 다시 계산함
        //toFixed는 소수점을 2자리까지 표현함 부정확성을 위해 표기함
    }
    get totalAmount() { //getter
        //preValue는 기존값 curItem은 현재값
        const sum = this.items.reduce(
            (preValue, curItem) => preValue + curItem.price,
            0
        ); //reduce는 배열을 하나의 값으로 줄이는 함수
        // items가 빈 배열이면 초기값은 0으로 반환임
        return sum;
    }

    //constructor() 호출 하지만 부모 클래스의 생성자를 호출하기위해 super()사용
    constructor(renderHookId) {
        super(renderHookId)
    }
    //부모 클래스에도 실행해야하는 생성자가 있는 경우 자체 constructor에서 실행해야함
    //주의점 super사용시 constructor() 메서드의 어떤 필드에도 의존하지 않음
    //super()는 항상 this를 참조하기 전에 호출해야함
    //무엇이 무엇과 같다는 식으로 생성자에 프로퍼티를 추가하려면 먼저 super를 호출해야함

    //메서드 생성
    addProduct(product) { //템플릿 리터럴임
        const updatedItems = [...this.items]; //기존의 배열을 복사함
        updatedItems.push(product); //상품을 장바구니에 추가함
        this.cartItems = updatedItems; //새로운 배열을 cartItems에 할당함
        // this.items.push(product); //상품을 장바구니에 추가함

    }

    render() {
        const cartEl = this.createRootElement('section', 'cart'); //여기 this는 이 클래스뿐만 아니라 부모 클래스까지 가리킴
        cartEl.innerHTML = `
            <h2>Total: \$${0}</h2>
            <button>Order Now!</button>
        `;
        this.totalOutput = cartEl.querySelector('h2')
        // return cartEl; //렌더 될때마다 cartEl를 반환함
    }
}

class ProductItem extends Component { //위에 데이터를 묶으면 안되고 단일 상품 아이템을 묶어야함
    constructor(product, renderHookId) {
        super(renderHookId);
        this.product = product; //생성자가 액세스 권한 얻게 됨
    }

    addToCart() {
        // product를 수락하고 렌더링된 cart를 업데이트한게 addProduct
        App.addProductToCart(this.product); // Productitem에 저장된 product 의미
        //클래스 자체에서 작업하고 cart 인스턴스를 비롯해 데이터를 공유한다는 점이 활용방법

        // console.log('Adding product to cart...');
        // console.log(this.product); //this는 상품아이템을 가리킴
        // ShoppingCart.addProduct() //클래스 자체를 입력하면 사용 못함 그래서 인스턴스화 해야함
    }

    render() {
        //여기에 있는 this는 전체 객체를 뜻함 죽 Product 객체
        const prodEl = this.createRootElement('li', 'product-item'); //li를 만들고
        // prodEl.className = 'product-item'
        //이렇게 하면 css에서 .product-item를 적용할 수 있음
        prodEl.innerHTML = `
                    <div>
                        <img src="${this.product.imageurl}" alt="${this.product.title}">
                        <div class= "product-item__content">
                            <h2>${this.product.title}</h2> 
                            <h3>\$${this.product.price}</h3>
                            <p>${this.product.description}</p>
                            <button>Add to Cart</button>
                    </div>
                `;
        const addCartButton = prodEl.querySelector('button');
        addCartButton.addEventListener('click', this.addToCart.bind(this));
        //bind를 쓰면 this를 상품아이템을 가리킴

    }
}

class ProductList extends Component {
    products = [
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
        )
    ]; //상품리스트를 담을 배열

    constructor(renderHookId) {
        super(renderHookId);
    }

    render() {
        this.createRootElement('ul', 'product-list',
            [new ElementAttribute('id', 'prod-list')
            ]);
        for (const prod of this.products) { //this는 productsList를 가리킴 prodList가 아님
            const productItem = new ProductItem(prod, 'prod-list'); //상품아이템을 인스턴스화함
            productItem.render(); //상품아이템을 렌더링함
        }
    }
}

class Shop {
    render() {
        // const renderHook = document.getElementById('app'); //app을 찾음
        // 수정상황
        //this를 장점이 사용하면 밑에 App클래스에서 init에서 Shop으로 액세스 할 수 있음
        this.cart = new ShoppingCart('app'); //인스턴스화 
        this.cart.render();
        const productList = new ProductList('app'); //인스턴스화
        productList.render();
        // const cartEl = this.cart.render(); //인스턴스화한 객체를 렌더링함
        // const productList = new ProductList(); //인스턴스화
        // const prodListEl = productList.render(); //인스턴스화한 객체를 렌더링함

        // renderHook.append(cartEl); //app에 section을 추가함
        // renderHook.append(prodListEl); //app에 ul을 추가함

    }
}

class App {  // 정적인 클래스
    static cart; //정적 필드 추가 즉 cart 프로퍼티가 있음
    //this를 정적 메서드에서 사용하면 항상 클래스 자체를 의미
    //클래스를 기반으로 하는 객체를 가리키는게 아님

    static init() {
        const shop = new Shop(); //인스턴스화
        // const { cart } = shop; // 구조 분해를 사용하여 shop에서 cart를 꺼낼 수 있음
        shop.render(); //인스턴스화한 객체를 렌더링함
        this.cart = shop.cart;
    }

    //이렇게 한 이유는 정적 메서드를 App에서도 사용할 수 있기 때문
    static addProductToCart(product) {
        this.cart.addProduct(product); //App클래스와 정적 메서드를 프록시로 이용
        //항상 인스턴스가 아닌 클래스로 작업하여 서로 다른 객체에서 작업하지 않음
        //정적 방법 없이 App의 여러 곳에 애플리케이션을 만드는 대신 App을 초기화하는 애플리케이션 이용
        //그 결과 Productitem에서 호출하는 것과 같음

    }
}

App.init(); //클래스에서 실행함

//상품리스트를 렌더링할려면 이 안의 모든게 연결되어 있어야함

//객체리터럴 표기법은 데이터를 그룹으로 묶을때는 유용하지만 재사용이 가능한 객체코드를 쓰기 어려움

