import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
	const [currentTime, setCurrentTime] = useState(0);

	useEffect(() => {
		fetch('/time').then(res => res.json()).then(data => {
			setCurrentTime(data.time);
		});
	}, []);

	var request;
	function enable_input_area(inputs){
		var container = document.getElementById("inputtable");
		console.log(container, container.children);
		console.log(inputs);
		var list = container.children;
		console.log(list);
		for(var key in inputs){
			for(var i = 0; i < list.length; i++){
				if(list[i].getAttribute("name") == key){
					console.log(key, inputs[key]);
					if (inputs[key]){
						list[i].removeAttribute("hidden");
					} else {
						list[i].setAttribute("hidden", true);
					}
				}

			}

		}
	}

	function submit(){
		console.log(request);
		if(request == "read"){
			var id_string = document.getElementById("id_io").value;
			var id_int = parseInt(id_string);
			fetch('/pythondb', {"method": "POST", 'headers': {'Accept': 'application/json', 'Content-Type': 'application/json'}, "body" : JSON.stringify({"type": "read", "id": id_int})}).then(res => res.json()).then(data => {
				console.log(data);
				document.getElementById("name_o").innerHTML = data.name;
				document.getElementById("id_o").innerHTML = String(data.id);
				document.getElementById("marks_o").innerHTML = String(data.marks);
		    });
		}
		if(request == "create"){
			var name = document.getElementById("name_io").value;
			var id_string = document.getElementById("id_io").value;
			var id_int = parseInt(id_string);
			var marks_string = document.getElementById("marks_io").value;
			var marks_int = parseInt(marks_string);
			fetch('/pythondb', {"method": "POST", 'headers': {'Accept': 'application/json', 'Content-Type': 'application/json'}, "body" : JSON.stringify({"type": "create", "id": id_int, "name": name, "marks": marks_int})}).then(res => {
				console.log(res);
			});
		}
		if(request == "remove"){
			var id_string = document.getElementById("id_io").value;
			var id_int = parseInt(id_string);
			fetch('/pythondb', {"method": "POST", 'headers': {'Accept': 'application/json', 'Content-Type': 'application/json'}, "body" : JSON.stringify({"type": "delete", "id": id_int})}).then(res => {
				console.log(res);
			});
		}

		if(request == "update"){
			var name = document.getElementById("name_io").value;
			var id_string = document.getElementById("id_io").value;
			var id_int = parseInt(id_string);
			var marks_string = document.getElementById("marks_io").value;
			var marks_int = parseInt(marks_string);
			fetch('/pythondb', {"method": "POST", 'headers': {'Accept': 'application/json', 'Content-Type': 'application/json'}, "body" : JSON.stringify({"type": "update", "id": id_int, "name": name, "marks": marks_int})}).then(res => {
				console.log(res);
			});
		}

	};

	var buttons = [
		"create",
		"read",
		"update",
		"remove",
	];

	function setMode(mode){
		var i;
		for(i = 0; i < buttons.length; i++){
			document.getElementById(buttons[i]).removeAttribute("class");
		}
		document.getElementById(mode).setAttribute("class", "on");
		document.getElementById("inputarea").removeAttribute("hidden");
		request = mode;
	}

	function create(){
		console.log("i'm doing good");
		document.getElementById("inputarea").hidden = false;

		setMode("create");

		enable_input_area({
			"name": true,
			"id": true,
			"marks": true,
		})
	};

	function read(){
		console.log("i'm doing good");
		document.getElementById("inputarea").hidden = false;

		setMode("read");

		enable_input_area({
			"name": false,
			"id": true,
			"marks": false,
		})
	};

	function update(){
		console.log("i'm doing good");
		document.getElementById("inputarea").hidden = false;

		setMode("update");

		enable_input_area({
			"name": true,
			"id": true,
			"marks": true,
		})
	};

	function remove(){
		console.log("i'm doing good");
		document.getElementById("inputarea").hidden = false;

		setMode("remove");

		enable_input_area({
			"name": false,
			"id": true,
			"marks": false,
		})
	};

//document.getElementById("create").onclick = create;


	return (
		<div>
			<header>
				<div>
					<button id="create" onClick={create}>CREATE</button>
					<button id="read" onClick={read}>READ</button>
					<button id="update" onClick={update}>UPDATE</button>
					<button id="remove" onClick={remove}>DELETE</button>
					<div id="inputarea">
						<div id="inputtable">
							<p name="name">Name: <textarea id = "name_io"></textarea></p>
							<p name="id">id: <textarea id = "id_io"></textarea></p>
							<p name="marks">marks: <textarea id = "marks_io"></textarea></p>
						</div>
						<button onClick={submit}>SUBMIT</button>
						<div id="outputtable">
							<p name="name">Name: <div id = "name_o"></div></p>
							<p name="id">id: <div id = "id_o"></div></p>
							<p name="marks">marks: <div id = "marks_o"></div></p>
						</div>
					</div>

				</div>
			</header>
		</div>
	);
}

export default App;
