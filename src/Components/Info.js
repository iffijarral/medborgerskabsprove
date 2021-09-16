import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { IntroData } from 'Data/Data';
import Typography from '@material-ui/core/Typography';
import 'Styles/About.css';



export default function Info() {    
    
    return (
        <section>
            <div className="introWrapper">
                {
                    IntroData.map((data, index) => (
                        <InfoItem key = {index} {...data} />
                    ))
                }
            </div>
        </section>
    );
}

const InfoItem = (props) => {
    return (
        <Card key={props.key}>
            <CardActionArea>
                <CardMedia
                    className="imgBlock"
                    image={props.img}
                    title={props.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.shortDescription}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>

                <Link to={`about/${props.title}`}>Read More</Link>

            </CardActions>
        </Card>
    )
}