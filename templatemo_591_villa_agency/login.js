document.getElementById("login").addEventListener("click", async function (e) {
	e.preventDefault();

	let email = document.getElementById("exampleInputEmail1");
	let pass = document.getElementById("exampleInputPassword1");

	console.log(email.value);
	console.log(pass.value);

	const data = {
		email: email.value,
		password: pass.value,
	};

	console.log(JSON.stringify(data));

	let options1 = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	};

	// console.log(email.value);
	// let options = {
	// 	method: "POST",
	// 	body: JSON.stringify(data),
	// };

	let p = await fetch("http://localhost:3000/cityOnTip/login", options1);
	let response = await p.json();
	// return response;
	// console.log("user registerd...");
	console.log(response);
	if (response.success) {
		console.log(response.data.username);
		localStorage.setItem("uid", response.data.userid);
		localStorage.setItem("uname", response.data.username);
		alert("Logged in successfully");

		setTimeout(() => {
			window.location.href = "index.html";
		}, 1000);
	} else {
		alert(response.msg);
		setTimeout(() => {
			window.location.href = "index.html";
		}, 1000);
	}
});
