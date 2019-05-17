import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ModalWrapped from './Modal';
import CustomDialog from './Dialog';

const StyledTypography = withStyles({
    root: {
      color: 'white',
    //   textShadow: '-1px 0 gray, 0 1px gray, 1px 0 gray, 0 -1px gray ',
    },
  })(Typography);

export default class MediaCard extends React.Component{

    constructor(props){
        super(props);
        this.DialogElement = React.createRef();
    }

    HSLToRGB = (h,s,l) => {
        // Must be fractions of 1
        s /= 100;
        l /= 100;
      
        let c = (1 - Math.abs(2 * l - 1)) * s,
            x = c * (1 - Math.abs((h / 60) % 2 - 1)),
            m = l - c/2,
            r = 0,
            g = 0,
            b = 0;

        if (0 <= h && h < 60) {
            r = c; g = x; b = 0;
            } else if (60 <= h && h < 120) {
            r = x; g = c; b = 0;
            } else if (120 <= h && h < 180) {
            r = 0; g = c; b = x;
            } else if (180 <= h && h < 240) {
            r = 0; g = x; b = c;
            } else if (240 <= h && h < 300) {
            r = x; g = 0; b = c;
            } else if (300 <= h && h < 360) {
            r = c; g = 0; b = x;
            }
            r = Math.round((r + m) * 255).toString(16);
            g = Math.round((g + m) * 255).toString(16);
            b = Math.round((b + m) * 255).toString(16);
        
            return "#"+r+""+g+""+b;
      }

    randomColor = () => {
        let h = Math.floor(Math.random()*360);
        let s = 30 + Math.floor(Math.random()*40);
        let l = 40 + Math.floor(Math.random()*20);
        let randomColor = this.HSLToRGB(h,s,l);
        // var randomColor = '#'
        // for (var i = 0, random = []; i < 3; i++) {
        //     randomColor += (Math.floor(Math.random()*256)).toString(16);
        // }
        // console.log(randomColor);
        return randomColor; 
    };

    state = {
        modalOpen : false,
    };

    randomStyle = () => {
        return ({
                width: 250,
                height: 150,
                backgroundColor: this.randomColor(),
                textAlign: 'center',
                padding: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
        });
    };

    handleCardClick = () => {
        this.DialogElement.current.handleClickOpen();
    }
    
    render(){
        const rStyle = this.randomStyle();
        return(
            <Card style={rStyle}>
                <CardActionArea onClick={this.handleCardClick}>
                    <CardContent style={rStyle}>
                    <StyledTypography gutterBottom variant="h5" component="h2">
                        {this.props.name}
                    </StyledTypography>
                    </CardContent>
                </CardActionArea>
                <CustomDialog 
                    ref={this.DialogElement} 
                    name={this.props.name}
                    description={this.props.description}
                    site={this.props.site}
                    jobsSite={this.props.jobsSite}
                    categories={this.props.categories}
                    opportunities={this.props.opportunities}
                    cities={this.props.cities}
                    fundation={this.props.fundation}/>
            </Card>
            
        );
    }
};
