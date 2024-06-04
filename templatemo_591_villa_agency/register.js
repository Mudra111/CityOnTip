document
	.getElementById("register")
	.addEventListener("click", async function (e) {
		e.preventDefault();

		let name = document.getElementById("inputName4");
		let email = document.getElementById("inputEmail4");
		let pass = document.getElementById("inputPassword4");
		let role = document.getElementById("inputState");

		console.log(email.value);
		console.log(pass.value);
		console.log(name.value);
		console.log(role.value);

		const data = {
			name: name.value,
			email: email.value,
			password: pass.value,
			role: role.value,
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

		let p = await fetch("http://localhost:3000/cityOnTip/register", options1);
		let response = await p.json();
		// return response;
		// console.log("user registerd...");
		console.log(response);
		if (response.success) {
			alert("Request sended successfully");
			setTimeout(() => {
				window.location.href = "index.html";
			}, 1000);
		} else {
			alert(response.msg);
		}
	});
