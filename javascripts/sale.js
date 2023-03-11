//商品データ管理オブジェクト
const products = [
    {
        id: 1,
        name: "オリジナルブレンド200g",
        price: 500,
    },
    {
        id: 2,
        name: "オリジナルブレンド500g",
        price: 900,
    },
    {
        id: 3,
        name: "スペシャルブレンド200g",
        price: 700,
    },
    {
        id: 4,
        name: "スペシャルブレンド500g",
        price: 1200,
    }
]
// HTMLのフォームで入力した値を取得
const priceElement = document.getElementById("product");
const numberElement = document.getElementById("number");
let purchases = [];

// 商品の料金と数量を追加（追加ボタン）
function add() {
    //const price = parseInt(priceElement.value);
    const proId = parseInt(priceElement.value);
    // findメソッド：配列の要素を探して一番最初に見つかった要素を取得。
    // フォームで選択した商品のidとproductsのidがイコールの情報を取得。
    const product = products.find(item => item.id == proId);
    const number = parseInt(numberElement.value);

    let purchase = {
        //price: price,
        product: product,
        number: number,
    };
    
    // 回答例2を変更
    // 配列オブジェクト.findIndex(コールバック関数)：コールバック関数に合致する最初の要素を返却するメソッド
    // purchasesの中の配列のIDとファームから入力されたIDが重複の場合、numberを加算、重複で無い場合purchasesにpush（追加）
    const newPurchase = purchases.findIndex((item) => item.product.id === purchase.product.id)
    if(purchases.length < 1 || newPurchase === -1){
        purchases.push(purchase);
    } else {
        purchases[newPurchase].number += purchase.number;
    }

    // //回答例1
    // let newPurchase = true;
    // // purchasesの中の配列の全ての要素をitemに渡し、purchase.priceと比較
    // // purchases -> item（全てのpriceを比較・確認できる）
    // purchases.forEach((item) => {
    //     if(item.price === purchase.price){
    //         newPurchase = false;
    //     }
    // })
    // // purchasesの中に何もない or newPurchaseがture
    // if(purchases.length < 1 || newPurchase){
    //     purchases.push(purchase);
    // } else {
    //     for(let i=0; i<purchases.length; i++){
    //         if(purchases[i].price === purchase.price){
    //             purchases[i].number += purchase.number;
    //         }
    //     }
    // }
    // //回答例2(別のやり方)
    // const newPurchase = purchases.findIndex((item) => item.price === purchase.price)
    // if(purchases.length < 1 || newPurchase === -1){
    //     purchases.push(purchase);
    // } else {
    //     purchases[newPurchase].number += purchase.number;
    // }
    //////////////////////////////////////////////////////////
    // 追加ボタンが押される度に(add()関数が実行される度に)purchases配列にpurchaseオブジェクト(priceとnumber)を追加
    //purchases.push(purchase); // purchases変数を操作
    //////////////////////////////////////////////////////////
    // 下記の処理だけでは新しく追加した分の重複分までは判定できていない
    // for(let i=0; i<=purchases.length; i++){
    //     debugger
    //     if(purchases.length < 1 || purchases[i].price !== purchase.price){
    //         purchases.push(purchase);
    //         break;
    //     } else {
    //    debugger
    //         purchases[i].number += purchase.number;
    //         break;
    //     }
    // }
    // 小計表示
    window.alert(`${display()}\n小計${subtotal()}円`);
    // 小計を計算した後、valueをリセット
    priceElement.value="";
    numberElement.value="";
}

// 現時点での購入履歴の内容の文字列を返す
function display() {
    // purchasesのpriceとnumberから読み取って、length文stringにつなげる
    // let string = "";
    // for (let i=0; i<purchases.length; i++) {
    //     string += `${purchases[i].price}円が${purchases[i].number}点\n`;
    // }
    // return string;
    ///////////////////////////////////////////////////////////
    // mapを使用
    // return purchases.map(purchase => {
    //     return `${purchase.price}円が${purchase.number}点`
    // }).join("\n"); //配列のため","も表示されるためjoin()メソッドで変換 → .join("\n")改行で文字列を連結
    return purchases.map(purchase => {
        return `${purchase.product.name} ${purchase.product.price}円が${purchase.number}点\n`
    }).join("");
}

// 現時点での小計を算出
function subtotal() {
    // let sum = 0;
    //     for(let i=0; i<purchases.length; i++) {
    //         sum += purchases[i].price * purchases[i].number;
    //     }
    // return sum;
    ///////////////////////////////////////////////////////////
    // reduceを使用
    // purchasesの中にある配列の要素をpurchaseに渡す
    // 
    return purchases.reduce((prev, purchase) => {
        //return prev + purchase.price* purchase.number;
        return prev + purchase.product.price* purchase.number;
    }, 0);
}

// 金額計算
function calc() {
    const sum = subtotal();
    const postage = calcPostageFromPurchase(sum);
    //let sum=0;
    //let postage=0;
     window.alert(`送料は${postage}円です。合計は${sum+postage}円です。`);
    // 初期化
    purchases = [];
    // priceElement.value="";
    // numberElement.value="";
}

// 商品の小計を元に送料を返す
function calcPostageFromPurchase(sum){
    // 送料計算
    if(sum == 0 || sum >= 3000) {
        return 0;
    } 
    else if(sum < 2000) {
        return 500;
    }
    else {
        return 250;
    }
}