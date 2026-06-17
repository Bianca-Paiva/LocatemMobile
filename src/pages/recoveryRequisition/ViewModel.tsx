import React, {useState} from "react";

const RecoveryRequisitionViewModel = () => {
    const [values, setValues] = useState({
        userEmail: "",
    });

    const onEmailChange = (text : string) => {
        setValues({
            ...values,
            userEmail: text,
        });
    }

    return{
        ...values,
        onEmailChange,
    }
}

export default RecoveryRequisitionViewModel;