// Dependencies
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// Components
import DataInfo from '../../UI/DataInfo/DataInfo';

import styles from './UserPage.module.css';

class UserPage extends Component {
    render() {
        const {
            show,
            title,
            stateType,
            viewInfo,
            page,
            mediaIsFetched,
            mediaItems
        } = this.props;
        let visible = styles.Hide;
        let pageContent = null;
        if(show) {
            visible = styles.Show;
            pageContent = (
                <Fragment>
                    <DataInfo 
                        loading={!mediaIsFetched}
                        data={{
                            results: mediaItems[stateType]['movies']
                        }}
                        changePage={() => {console.log('change the page man')}}
                        title={title}
                        page={page}  
                        viewInfo={viewInfo}
                        type="movie"
                        stylesType="user"
                        stateType={stateType}/>
                    <DataInfo 
                        loading={!mediaIsFetched}
                        data={{
                            results: mediaItems[stateType]['tv']
                        }}
                        changePage={() => {console.log('change the page man')}}
                        title={title}
                        page={page}
                        viewInfo={viewInfo}
                        type="tv" 
                        stylesType="user"
                        stateType={stateType}/>
                </Fragment>
            );
        }
        return (
            <div className={[styles.UserPage, visible].join(' ')} >
                {pageContent}
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        mediaIsFetched: state.info.mediaIsFetched,
        mediaItems: state.info.mediaItems
    };
};

export default connect(mapStateToProps)(UserPage);