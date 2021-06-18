import React from 'react'
import ReactLoading from 'react-loading'
const Loading = () => {
    return <div className="loading-all">
        <ReactLoading type="spin" color="blue" height={200} width={175} />
     </div>
}
 
export default Loading