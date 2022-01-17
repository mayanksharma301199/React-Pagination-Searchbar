import React from 'react';
import { Card } from 'antd';
import styles from './SinglePost.module.css';

const SinglePost = (props) => {

    return (<>
            <div className={styles['singlepost_container']}>
                <Card type="inner" title= {props.title} className={styles['singlepost_card']}>
                    <p>{props.post}</p>
                </Card>
            </div>
        </>
    );
};

export default SinglePost;