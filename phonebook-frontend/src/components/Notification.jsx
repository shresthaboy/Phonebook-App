const Notification = ({errMessage}) =>{
    if(errMessage == null){
        return null;
    }
    const errorstyle={
        color:'red'
    }

    return(
        <div style={errorstyle}>
            {errMessage}
        </div>
    )
}

export default Notification