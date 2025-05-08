import React, { useState, useEffect } from 'react';
import Slide from './layout_page/Slide.js';
import Header from './layout_page/Header.js';
import Footer from './layout_page/Footer.js';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState(true); 

  const fetchProducts = async () => {
    const order = sort ? 'asc' : 'desc';
    const limit = sort ? 8 : 4;
    try {
      const res = await axios.get(`http://localhost:3000/products?_sort=price&_order=${order}&_limit=${limit}`);
      setProducts(res.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [sort]); // gọi lại khi sort thay đổi

  return (
    <>
      <Header />
      <div className="mt-2">
        <Slide />
      </div>
      <div className="container mb-5 mt-5">
        <marquee width="80%" scrollamount="10">
          <h4 className="txtdeepshadow">Các loại bánh tại cửa hàng</h4>
        </marquee>
        <div className="row">
          <div className="col-md-6 beta-products-details">
            <p className="pull-left t">
              Hiện có <span className="text-danger">{products.length}</span> sản phẩm
            </p>
            <div className="clearfix"></div>
          </div>
          <div className="col-md-6">
            <button onClick={() => setSort(true)} className="beta-btn primary op">Thấp đến cao</button>
            <button onClick={() => setSort(false)} className="beta-btn primary lz">Cao đến thấp</button>
          </div>
        </div>
        <div className="row">
          {products.map((product, index) => (
            <Item key={index} product={product} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

const Item = ({ product }) => {
  const showType = (name_category) => {
    if (name_category === 'sản phẩm mới') return 'New';
    if (name_category === 'sản phẩm hot') return 'Hot';
    if (name_category === 'sản phẩm khuyến mãi') return 'Sale';
    return '';
  };

  return (
    <div className="col-sm-3 mt-4">
      <div className="single-item">
        <div className="ribbon-wrapper">
          <div className="ribbon sale">{showType(product.name_category)}</div>
        </div>
        <div className="single-item-header">
          <a><img src={product.image} alt="" height="300" width="500" /></a>
        </div>
        <div className="single-item-body">
          <p className="single-item-title text-center text-danger t">{product.name}</p>
          <p className="single-item-price text-center">
            <span className="mb-3 t">$ {product.price}</span>
          </p>
        </div>
        <div className="single-item-caption mt-1 ml-5">
          <a className="add-to-cart pull-left"><i className="fa fa-shopping-cart" /></a>
          <NavLink to={`/products/${product.id}/productdetail`}>
            <button className="beta-btn primary">Details <i className="fa fa-chevron-right" /></button>
            <div className="clearfix" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AllProduct;

// import React, {Component} from 'react';
// import Slide from './layout_page/Slide.js';
// import Header from './layout_page/Header.js';
// import Footer from './layout_page/Footer.js';
// import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
// import axios from 'axios';
// class AllProduct extends Component {
// 	 constructor(props){
//         super(props)
//         this.state = {
//            products : [],
//            sort : true,       
//         }
//     }    
//     componentDidMount(){
//       axios({
//         method: 'GET',
//         url :'http://localhost:3000/products',
//         data : null
//       }).then(res =>{
//         this.setState({
//           products :res.data
//         });
//       }).catch( err =>{
//       });
//     }


//     componentWillUpdate(){
//       if (this.state.sort === true) {
//           axios({
//             method: 'GET',
//             url :'http://localhost:3000/products?_sort=price&_order=asc&_limit=8',
//             data : null
//           }).then(res =>{
//             this.setState({
//               products :res.data
//             });
//           }).catch( err =>{
//           });
//       }else{
//           axios({
//           method: 'GET',
//           url :'http://localhost:3000/products?_sort=price&_order=desc&_limit=4',
//           data : null
//           }).then(res =>{
//             this.setState({
//               products :res.data
//             });
//           }).catch( err =>{
//           });
//       }
      
//     }

//     Low = () =>{
//       this.setState({
//         sort: true
//       });
//     }

//     High = () =>{
//       this.setState({
//         sort: false
//       });
//     }

//     onChange = (event) =>{
//       var target = event.target;
//       var name = target.name;
//       var value = target.value;
//       this.setState({
//         [name] : value
//       });
//     }

//     render() {
//     var { products,keyword } = this.state;
//   	return (
//        <React.Fragment>
//         <Header />
//        <div className="mt-2">
//           <Slide />
//         </div>
//        <div className="container mb-5 mt-5">
//         <marquee width="80%" scrollamount="10"><h4 className="txtdeepshadow">Các loại bánh tại cửa hàng</h4></marquee>
//         <div className="row">
//             <div className="col-md-6 beta-products-details">
//                 <p className="pull-left t">Hiện có <span className="text-danger">{this.state.products.length}</span> sản phẩm</p>
//               <div className="clearfix"></div>
//             </div>
//             <div className="col-md-6">
//               <button onClick = {this.Low} className="beta-btn primary op">Thấp đến cao</button>
//               <button onClick = {this.High} className="beta-btn primary lz">Cao đến thấp</button>
//             </div>
//         </div>
//            {this.state.products.map((product,index) => {
//                          return < Item key={index} product={product} />
//                 })}
//        </div>         
//   			<Footer />		
//         </React.Fragment>
//    		);
// 	}
// }

// class Item extends Component {

//  render() {
//   return (
//   <React.Fragment>   
//      <div className="col-sm-3 mt-4">
//         <div className="single-item">
//         <div className="ribbon-wrapper"><div className="ribbon sale">{this.showType(this.props.product.name_category)}</div></div>
//           <div className="single-item-header">
//             <a><img src={this.props.product.image} alt="" height="300" width="500" /></a>
//           </div>
//           <div className="single-item-body">
//             <p className="single-item-title text-center text-danger t">{this.props.product.name}</p>
//             <p className="single-item-price text-center">
//               <span className="mb-3 t">$ {this.props.product.price}</span>
//             </p>
//           </div>
//           <div className="single-item-caption mt-1 ml-5">
//             <a className="add-to-cart pull-left"><i className="fa fa-shopping-cart" /></a>
//             <NavLink to={`/products/${this.props.product.id}/productdetail`}>
//                 <button className="beta-btn primary">Details <i className="fa fa-chevron-right" /></button>
//                 <div className="clearfix" />
//             </NavLink>
//           </div>
//         </div>
//       </div>
//     </React.Fragment>
//       );
//   }
//   showType(name_category){
//       var kq = '';
//       if (name_category === 'sản phẩm mới') {
//           kq = "New"
//       }else if (name_category === 'sản phẩm hot') {
//           kq = "Hot"
//       }else if (name_category === 'sản phẩm khuyến mãi'){
//           kq = "Sale"
//       }
//       return kq;
//     }
// }


// export default AllProduct;