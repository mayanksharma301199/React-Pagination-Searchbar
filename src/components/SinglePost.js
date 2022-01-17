import React from 'react';
import { Card, Col, Row } from 'antd';

const SinglePost = (props) => {

    return (<>
            <div style={{width:"25%"}}>
                <Card type="inner" title= {props.title} style={{width:"250px", margin:"auto"}}>
                    <p>{props.post}</p>
                </Card>
            </div>
        {/* <Card type="inner" title= {props.title} style={{ width: 300, margin:"auto"}}>
            <p>{props.post}</p>
        </Card> */}
        </>
    );
};

export default SinglePost;