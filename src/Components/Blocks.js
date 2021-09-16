import React from 'react';
import DescriptionIcon from '@material-ui/icons/Description';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { Link } from 'react-router-dom';
import { BlocksData } from 'Data/Data';
import 'Styles/Blocks.css';

export default function Blocks() {

    return (
        <section className="blocksWrapper">

            <div className="blocksContainer">
                {
                    BlocksData.map((data, index) => (

                        <Block key={index} {...data} />

                    ))
                }

            </div>

        </section>
    );
}

function Block(props) {

    return (
        <div className="block">
            <Link to={props.to}>
                {
                    (props.icon === 'DescriptionIcon')
                        ? <DescriptionIcon className='icon' />
                        : (props.icon === 'ShoppingCartIcon')
                            ? <ShoppingCartIcon className='icon' />
                            : <ListAltIcon className='icon' />
                }
                <h2 className="blockHeading">{props.heading}</h2>
                <p className="blockParagraph">{props.description}</p>
                {
                    (props.icon === 'DescriptionIcon')
                        ? <p className="blockParagraph">more...</p>
                        : null
                }
            </Link>
        </div>

    );
}

