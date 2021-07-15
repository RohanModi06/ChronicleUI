document.getElementById("chronicle").addEventListener("submit",(e)=> {
    let pincode = document.getElementById("pincode").value;
    console.log(pincode);
    var myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("cache-control", "no-cache");
    myHeaders.append("content-type", "application/json");
    myHeaders.append("authorization", "Basic WVhCcFlXUnRhVzQ2YlRGOnVkSEpoVWpCamEyVjBNVE1oSXc9PQ==");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };
    var Log;
    fetch("http://lmsreg-chronicle.dockins.myntra.com/myntra-chronicle-service/chronicle/v2/log/ServiceabilityConfig/DEFAULT/"+pincode, requestOptions)
    .then(response => response.text())
    .then(result => Log=result)
    .catch(error => console.log('error', error));

    console.log(Log);
    e.preventDefault();
});