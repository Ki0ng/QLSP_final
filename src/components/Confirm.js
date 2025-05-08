import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Wrapper from './layout_admin/wrapper.js';
import Banner from './layout_admin/banner.js';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Add = () => {
  const { id } = useParams();
  const [status, setStatus] = useState('');
  const [contactId, setContactId] = useState('');

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/contacts/${id}`)
        .then((res) => {
          const data = res.data;
          setContactId(data.id);
          setStatus(data.status);
        })
        .catch((err) => {
          console.error("Lỗi khi lấy dữ liệu:", err);
        });
    }
  }, [id]);

  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === 'status') {
      setStatus(value === 'true'); // Convert string to boolean
    }
  };

  const onSave = (event) => {
    event.preventDefault();

    axios.put(`http://localhost:3000/contacts/${contactId}`, {
      status: status
    })
    .then(() => {
      toast.success("Cập nhật trạng thái thành công!");
    })
    .catch((err) => {
      toast.error("Có lỗi xảy ra khi cập nhật!");
    });
  };

  return (
    <>
      <ToastContainer />
      <div id="wrapper">
        <Wrapper />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="contentt">
            <Banner />
            <form onSubmit={onSave} className="contact-form">
              <select
                className="form-control sl"
                name="status"
                value={status}
                onChange={onChange}
                required
              >
                <option value={true}>Xác nhận</option>
                <option value={false}>Chưa xác nhận</option>
              </select>
              <div className="form-block mt-3">
                <button type="submit" className="btn btn-primary">Lưu</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Add;

// import React, {Component} from 'react';
// import axios from 'axios';
// import Wrapper from './layout_admin/wrapper.js';
// import Banner from './layout_admin/banner.js';
// import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// class Add extends Component {
// 	constructor(props){
//         super(props);
//         this.state = {
//             id: '',
//             name: '',
//             email : '',
//             messages : '',
//             status : '',            
//         }
//     }

//     componentDidMount(){
//       var {match} = this.props;
//       if (match) {
//         var id = match.params.id;
//         axios({
//         method: 'GET',
//         url :`http://localhost:3000/contacts/${id}`,
//         data : null
//        }).then(res =>{
//         var data =res.data;
//           this.setState({
//             id: data.id,
//             status : data.status,
//           });
//         }).catch( err =>{
//       });
//      }
//     }

//     onChange = (event) =>{
//       var target =event.target;
//       var name =target.name;
//       var type =target.type;
//       var value =target.value;
//       this.setState({
//         [name] : value,
//       });
//     }



//     render() {
//     	var { status } = this.state;
//   	return (		      
//         <React.Fragment>
//         <div>
//           <div id="wrapper">
//             <Wrapper />
//             <div id="content-wrapper" className="d-flex flex-column">
//             <div id="contentt">
//            <Banner />
//            <form onSubmit = {this.onSave} className="contact-form"> 
//                 <select className="form-control sl" name ="status" value ={this.state.tinhtranghang} onChange ={this.onChange} required="required">
//                     <option value={true}>Xác nhận</option>
//                     <option value={false}>Chưa xác nhận</option>
//                 </select>
//                 <div className="form-block">
//                 <button type="submit"  className="btn btn-primary">Lưu</button>&nbsp;
//               </div>
//            </form>                
//             </div>
//           </div>
//         </div>
//         </div>
//         </React.Fragment>  
//    		);
// 	}
// }

// export default Add;