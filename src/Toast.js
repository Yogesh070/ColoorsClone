
class App extends React.Component { 
    constructor (props,context) {
      super(props, context)
  
      this.onClickAddNotification = this.onClickAddNotification.bind(this)
      
      this.toastRef = null
    }
    
    componentDidMount() {
      this.toastRef = this.refs.toastNotifier
    }
    
    onClickAddNotification () {
      const notif = {
        icon:'message', 
        title: 'title goes here ', 
        message: 'some message to display for',
      }
      this.toastRef.addToast(notif)
    }
    
    
    render() {
      return ( 
        <div className="wrapper">
          <div className="btn" onClick={this.onClickAddNotification}> Click here to Add</div>
          <ToastNotification ref={'toastNotifier'} position={3}/>
        </div>
      )
    }
  }
  
  class ToastNotification extends React.Component {
    
    constructor (props,context) {
      super(props, context)
  
        
      this.state = {
        toastsArray: Immutable.List()
      }  
      
      this.positionMap = {
        1 : 'top-left',
        2 : 'top-right',
        3 : 'bottom-right',
        4 : 'bottom-left',
      }
    
      this.addToast = this.addToast.bind(this)
      this.removeToast = this.removeToast.bind(this)
      this.clearAllToast = this.clearAllToast.bind(this)
    }
    
    addToast (toastObject) {
      toastObject && 
      this.setState(({toastsArray})=>{
        return {toastsArray: toastsArray.push(toastObject)}
      })
    }
    
    removeToast(index) {
      this.setState(({toastsArray})=>{
        const current= toastsArray.get(index)
        current.isDeleted =  true
        return {toastsArray: toastsArray.set(index, current)}
      })
      
      setTimeout(function(){
        this.setState(({toastsArray})=>{
          return {toastsArray: toastsArray.delete(index)}
        })
      }.bind(this), 2000)
    }
    
    clearAllToast() {
      
    }
    
    render() {
      const {toastsArray} = this.state
      const position = this.positionMap[this.props.position] || 'bottom-left'
      return (  
      <div className={'toast-notification-panel ' + position}>    
          {toastsArray.map((toast, index)=>{
            return (
         <ToastWrapper index={index} key={index} icon={toast.icon} title={toast.title} message={toast.message} isDeleted={toast.isDeleted} onClickToast={this.removeToast}/>  
            )
          })}
      </div>
      )
    }
  }
  
  const ToastWrapper = ({index, icon, title, message, isDeleted, onClickToast})=>{
    return (
      <div className={'toast-wrapper ' + icon + ' ' + (isDeleted && 'toast-out')} 
        onClick={()=>onClickToast(index)}>
        <div className="toast">
          <div className="toast-header">{title}</div>  
          <div className="toast-text">{message}</div>       
        </div>
      </div>
    )
  }
  
  ReactDOM.render(<App/>, document.body)

// csss for tosat/

//   @import url("https://fonts.googleapis.com/css?family=Quicksand:400,500,700");

// @mixin trans($prop:all, $time:0.4s, $time_function:ease-in-out) {
//   transition: $prop $time $time_function;
// }

// html {
//   box-sizing: border-box;
// }

// *,
// *:before,
// *:after {
//   box-sizing: inherit;
// }

// ::-webkit-input-placeholder {
//   color: #e4e4e4;
// }

// html, body {
//   width: 100%;
//   height: 100%;
//   margin: 0;
//   padding: 0;
//   font-family: "Quicksand", sans-serif;
// }

// .wrapper {
//   margin: 20px auto;
//   padding: 20px;
//   position: relative;
// }

// .btn {
//   width: 230px;
//   padding: 10px;
//   background-color: teal;
//   color: #fff;
  
//   font-size: 1.2em;
//   font-weight: 900;
//   border-radius: 6px;
//   user-select: none;
//   text-align: center;

//   cursor: pointer;
  
//   margin: 0 auto;
// }

// .toast-notification-panel {
//   width: 350px;
//   padding: 15px;

//   position: fixed;
//   overflow-y: scroll;
  
//   &.top-left {
//     top: 10px;
//     left: 10px;
//   }
  
//   &.top-right {
//     top: 10px;
//     right: 10px;  
//   }
  
//   &.bottom-left {
//     bottom: 10px;
//     left: 10px;
//   }
  
//   &.bottom-right {
//     bottom: 10px;
//     right: 10px;
//   }
// }

// .toast-wrapper {
//   min-height: 80px;
//   border: 1px solid #ccc;
//   border-radius: 6px;

//   display: flex;
//   align-items: center;
  
//   .toast {
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//   }
//   padding-left: 20px;

//   box-shadow: 2px 2px 10px #ccc;
  
//   transition: transform .6s ease-in-out;
//   animation: toast-in .7s;
  
//   user-select: none;
  
//   &:not(:last-child) {
//     margin-bottom: 15px;
//   }
  
//   &.toast-out {
//     animation: toast-out .6s forwards;
//   }
  
//   .toast-header {
//     font-weight: 700;  
//   }
  
//   .toast-text {
//     font-weight: 400;
//     font-size: .9em;
    
//   }
// }

// .toast-wrapper {
//   &:before {
//     font-family: FontAwesome;
//     font-size: 30px;
//     padding-right: 15px;
//   }
  
//   $icons-list: message "\f0e6", calendar "\f073";
     
//   @each $icon in $icons-list {
//     $key: nth($icon, 1);
//     $value: nth($icon, 2);
//     &.#{$key} {
//       &:before {
//         content: $value;
//       }      
//     }
//   }
// }


// @keyframes toast-in {
//   from {
//     transform: translatex(100%);
    
//   }
//   to {
//     transform: translatex(0);
//   }
// }

// @keyframes toast-out {
//   from {
//     transform: translatex(0);
    
//   }
//   to {
//     transform: translatex(100%);
//     opacity: 0;
//   }
// }