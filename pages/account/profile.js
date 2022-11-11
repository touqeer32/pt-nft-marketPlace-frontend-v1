import React, { useState, useEffect } from "react";
import SettingLayout from "../../components/layouts/SettingLayout";
import { get } from "../../utils";
import CreateUpdateForm from "../../components/profile/CreateUpdateForm";

export default function Profile(props) {
  var [userDetail, setUserDetails] = useState({});

  useEffect(() => {
    if (props?.userAddress) {
      fetchData();
    }
  }, [props?.userAddress]);

  async function fetchData() {
    var resposnse = await get("get-user-details", {
      address: props?.userAddress,
    });
    if (resposnse.data.status == 200) {
      var data = resposnse.data.row[0];
      if (resposnse.data.row[0]) {
        setUserDetails({ ...data });
      }
    }
  }

  return (
    <div className="basis-8/12">
      {userDetail?.name && (
        <CreateUpdateForm
          defaultValues={userDetail}
          userAddress={props.userAddress}
        />
      )}
      {!userDetail?.name && (
        <CreateUpdateForm
          defaultValues={userDetail}
          userAddress={props.userAddress}
        />
      )}
    </div>
  );
}
Profile.Layout = SettingLayout;
