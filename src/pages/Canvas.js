//import '../../src/Roulette.css';
import mongo from '../lib/mongo-service';
import React, { Component } from 'react';
import PropTypes from 'prop-types';    
import { Button } from 'react-bootstrap';
import Nav from '../Components/Nav';
import { geolocated } from "react-geolocated";
import { text } from 'dom-helpers';

class Canvas extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
        spinAngleStart: 0,
        startAngle: 0,
        spinTime: 0,
        random: 0,
        arc: Math.PI / (props.options.length / 2),
        cordsLat: 0,
        cordsLon: 0,
        txt:'',
      }
      this.spinTimer = null;
      this.handleOnClick = this.handleOnClick.bind(this);
      this.spin = this.spin.bind(this);
      this.rotate = this.rotate.bind(this);
    }
  
    static propTypes = {
      className: PropTypes.string,
      options: PropTypes.array,
      baseSize: PropTypes.number,
      spinAngleStart: PropTypes.number,
      spinTimeTotal: PropTypes.number,
      onComplete: PropTypes.func,
    };
  
    static defaultProps = {
      options:  [
        'PRODUCTE GRATIS',
        'COMPRA ONLINE -9€',
        'PRODUCTE GRATIS',
        'PRODUCTE GRATIS',
        'PRODUCTE GRATIS',
        'FRUITA I VERDURA -15%',
        'PRODUCTE GRATIS',
        'PRODUCTE GRATIS',
        'PRODUCTE GRATIS',
        'FORN ARTESANA GRATIS', /*COMIENZO*/ 
        'PRODUCTE GRATIS',
        'PRODUCTE GRATIS',
        ],
      colors: [
        '#f5c8b9',
        '#d75f3b',
        '#f4c69d',
        '#efa748',
        '#495292',
        '#6ebe9d',
        '#f5c8b9',
        '#d75f3b',
        '#f4c69d',
        '#efa748', /*COMIENZO*/ 
        '#495292',
        '#6ebe9d',
      ],
      text_colors: [
        '#495292',
        '#fffffe',
        '#a0382a',
        '#fffffe',
        '#f3c7b8',
        '#155540',
        '#495292',
        '#DDE8BC',
        '#a0382a',
        '#452019', /*COMIENZO*/ 
        '#f3c7b8',
        '#155540',
      ],
      baseSize: 450,
      spinAngleStart: Math.random() * 10 + 10,
      spinTimeTotal: Math.random() * 3 + 4 * 1000,
    };
  
    componentDidMount() {
      this.drawRouletteWheel();
    }
    
    //BYTE TO HEX
    byte2Hex(n) {
      const nybHexString = '0123456789ABCDEF';
      return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
    }
    
    RGB2Color(r,g,b) {
      return '#' + this.byte2Hex(r) + this.byte2Hex(g) + this.byte2Hex(b);
    }
  
    getColor(item, maxitem) {
      const phase = 0;                                    
      const center = 128;
      const width = 128;
      const frequency = Math.PI*2/maxitem;
      
      const red = Math.sin(frequency*item+2+phase) * width + center;
      const green = Math.sin(frequency*item+0+phase) * width + center;
      const blue  = Math.sin(frequency*item+4+phase) * width + center;
      
      return this.RGB2Color(red,green,blue);
    }
  
    drawRouletteWheel() {
      const { options, baseSize, colors, text_colors } = this.props;
      let { startAngle, arc } = this.state;
      
      // const spinTimeout = null;
      // const spinTime = 0;
      // const spinTimeTotal = 0;
      
      let ctx;
      const canvas = this.refs.canvas;
      
      
      if (canvas.getContext) {
        const insideRadius = baseSize - 55;
  
        ctx = canvas.getContext('2d');
        
        ctx.clearRect(0,0,800,800);
       
        ctx.font = '36px Verifont';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
       
   
        for (let i = 0; i <colors.length; i++) {
          const angle = startAngle + i * arc;
          
          ctx.fillStyle = colors[i]
           
          //Dibujo de ruleta!
          ctx.beginPath();
          ctx.arc(baseSize, baseSize, 5 /*outsideRadius*/, angle, angle + arc, false);
          ctx.arc(baseSize, baseSize, insideRadius, angle + arc, angle, true);
          ctx.fill();
          ctx.save();
          //ctx.fillStyle = 'white';
          ctx.fillStyle = text_colors[i];
          
          ctx.translate(baseSize + Math.cos(angle + arc / 2) * /*textRadius*/ 200, 
                        baseSize + Math.sin(angle + arc / 2) * /*textRadius*/ 200);
          //ctx.rotate(angle + arc / 2 + Math.PI / 2);
          ctx.rotate(angle + arc / 22.5 + Math.PI / 22.5);
          const text = options[i];
          // ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
          ctx.fillText(text, -ctx.measureText(text).width / 2.5, 0);
          ctx.restore();       
        }
  
        //Arrow
        ctx.fillStyle = 'red';
        ctx.beginPath();
        //ctx.lineTo(baseSize + 10, baseSize - (outsideRadius + 20));
        //ctx.lineTo(baseSize + 0, baseSize - (outsideRadius - 5));
        //ctx.lineTo(baseSize - 10, baseSize - (outsideRadius + 20));
        ctx.lineTo(baseSize + 15, baseSize - (380 + 25));
        ctx.lineTo(baseSize + 0, baseSize - (380 - 5));
        ctx.lineTo(baseSize - 15, baseSize - (380 + 25));
        ctx.fill();
        ctx.stroke();
      }
    }
  
    spin() {
      //CLEAR RESULT
      const canvas = this.refs.canvas;
      const ctx = canvas.getContext('2d');
      // ctx.clearRect(0,750,1000,100);
      ctx.clearRect(0,750,1000,200);

      //SPIN FUNCTION
      this.spinTimer = null;

      // RANDOM SPIN
      const random = Math.floor(Math.random() * (30 - 15)) + 15;
     
      this.setState({ 
        spinTime: 0 + 5,
        random: random,
        txt: '',
      }, () => this.rotate());
      // console.log(this.state.random)
    }
  
    rotate(){
      const { spinAngleStart, spinTimeTotal } = this.props;
      if(this.state.spinTime > 2800) {
        clearTimeout(this.spinTimer);
        this.stopRotateWheel();
      } else {
        const spinAngle = spinAngleStart - this.easeOut(this.state.spinTime, 0, spinAngleStart, spinTimeTotal);
        this.setState({
          startAngle: this.state.startAngle + spinAngle * Math.PI / 180,
          spinTime: this.state.spinTime + this.state.random,
        }, () => {
          this.drawRouletteWheel();
          clearTimeout(this.spinTimer);
          this.spinTimer = setTimeout(() => this.rotate(), 30);
        })
        // console.log(this.state.random)
      }
    }
  
    stopRotateWheel() {
      let { startAngle, arc } = this.state;
      const { options, baseSize } = this.props;
      
      const img = new Image ()
      img.src = '../img/VALE.psd';
      
      const canvas = this.refs.canvas;
      const ctx = canvas.getContext('2d');
  
      const degrees = startAngle * 180 / Math.PI + 90;
      const arcd = arc * 180 / Math.PI;
      const index = Math.floor((360 - degrees % 360) / arcd);
      ctx.save();
      ctx.font = 'bold 30px Verifont';
      const text = options[index]
      
      ctx.drawImage(img,0,0,100,100);

      /*PRINT RESULT*/
      ctx.fillText(text, baseSize - ctx.measureText(text).width / 2, 920);
      ctx.restore();
    
      this.getIp (text)
      
            // this.props.onComplete(text);
    }
  
    easeOut(t, b, c, d) {
      const ts = (t/=d)*t;
      const tc = ts*t;
      return b+c*(tc + -3*ts + 3*t);
    }
  
    handleOnClick() {
      this.spin();
    }
    
    getIp (text) {
    
      this.setState({
        // cordsLat: this.props.coords.latitude,
        // cordsLon: this.props.coords.longitude,
        txt: text,
      });
      
      const publicIp = require('public-ip');
      
      (async () => {
        const ip = await publicIp.v4();
        // console.log(text, ip, this.props.coords.latitude, this.props.coords.longitude)
        mongo.create (text, ip, this.state.cordsLat, this.state.cordsLon)
    
      })();
    };
  
    render() {
      const { txt } = this.state     
      const { baseSize } = this.props;
    
      return (
        <div className='background'>
          {/* <Nav/> */}
            <div className="roulette">
              <h1 style={{fontSize: '3rem', margin: '0 0 -25px 0', width:'100%'}}>LA RULETA DE VERITAS</h1> 
              <div className="roulette-container">
                <canvas ref="canvas" width={baseSize * 2} height={baseSize * 2.1} className="roulette-canvas"></canvas>
            </div>
            <div className="roulette-container">
              <Button 
                variant="success"
                value="spin" 
                onClick={this.handleOnClick} 
                className="button"  
                style={{
                  fontFamily:'Verifont',
                  fontSize:'3rem',
                  margin: '3rem 0',
                  borderRadius: '6rem',
                  padding: '3.6rem 2.1rem',
                }} 
                id="spin">
                GIRAR!!
              </Button>
            </div>
            {/* <div className="roulette-container">
              <h1 className='res'>{txt}</h1>
            </div>  */}
          </div>
        </div>
      );
    };
  };
//  export default Canvas;
export default geolocated({
  positionOptions: {
      enableHighAccuracy: true,
  },
  userDecisionTimeout: 5000,
})(Canvas);