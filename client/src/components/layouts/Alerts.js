import React, { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";
export const Alerts = () => {
  const alertContext = useContext(AlertContext);

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.type} mt-2`}>
        <i className='fas fa-info-circle mr-2'></i>
        {alert.msg}
      </div>
    ))
  );
};

export default Alerts;
