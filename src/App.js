import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './routes.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const showContentMenu = (routes) => {
    if (routes.length > 0) {
      return routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.main}
        />
      ));
    }
    return null;
  };

  return (
    <Router>
      <ToastContainer />
      <Switch>
        {showContentMenu(routes)}
      </Switch>
    </Router>
  );
}

export default App;

// import React, {Component} from 'react';
// import './App.css';
// import AllProduct from './components/AllProduct.js';
// import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
// import routes from './routes.js';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// class App extends Component {
//   render(){
//   return (
//     <Router>
//     <ToastContainer />
//       <Switch>  
//         {this.showContentMenu(routes)} 
//       </Switch>    
//     </Router>  
//     );

//   }
//   showContentMenu = (routes) =>{
//     var result = null;
//     if (routes.length > 0) {
//       result = routes.map((route, index) =>{
//         return (
//             <Route key ={index} path = {route.path} exact = {route.exact} component={route.main} />
//           );
//       });
//     }
//     return result;
//   }

// }

// export default App;