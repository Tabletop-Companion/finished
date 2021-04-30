const Type = {
    GRAIN: "Grain",
    WOOL: "Wool",
    LUMBER: "Lumber",
    BRICK: "Brick",
    ORE: "Ore",
    DESERT: "Desert"
}

var boardSize = 3;
var tileSize;
var grid = null;
var typeToSelect = "Any";

var randomizeBoard = true;
var randomizePorts = true;
var winAmount = 10;

var selectedNode = null;
var ports = [];
var diceImgs = [];
var tileImgs = [[], []];
var cardImgs = [];
var robberImg;
var devCard;
var nodeHUD, resourceHUD, diceHUD, tradeHUD, infoHUD, cardHUD, adminHUD;
var players = [];
var gameState = "start";
var gameHeight;
var colours;
var buildingSize;
var turnNum = 1;
var roundNum = 1;
var currentPlayer;
var robber;
var resourceCount = [19, 19, 19, 19, 19];
var halvingHUDs = [];
var gap = 18;
var lastRound, lastTurn;
var styleNum = 1;
var longestRoad = 3;

document.getElementById("startButton").onclick = startGame;

window.onload = function () {
	var extra = location.href.split('?')[1];
	
	if (extra != "") {
		setTimeout(() => { loadGame(extra); }, 500);
	}
}

function startGame() {
    var name1 = document.getElementById("name1").value;
    var name2 = document.getElementById("name2").value;
    var name3 = document.getElementById("name3").value;
    var name4 = document.getElementById("name4").value;

    players[0] = new Player(name1);
    players[1] = new Player(name2);
	
    if (name3 != "")
        players[2] = new Player(name3);
    if (name4 != "")
        players[3] = new Player(name4);

    document.getElementById("nameForm").hidden = true;
	var game = document.getElementById("game");
	var canvas = document.getElementsByClassName("p5Canvas");
	game.appendChild(canvas[0]);
	
    for (let p of players) {
        diceHUD.rollDice();
        p.rollNumber = diceHUD.diceRoll;
    }

    sortPlayers();
	adminHUD = new AdminHUD();
    currentPlayer = players[0];
    infoHUD.default();

    gameState = "started";
}

function sortPlayers() {
    var changed;

    do {
        changed = false;
        for (var i = 0; i < players.length - 1; i++) {
            if (players[i].rollNumber > players[i + 1].rollNumber) {
                var t = players[i];
                players[i] = players[i + 1];
                players[i + 1] = t;

                changed = true;
            }
        }
    } while (changed);

    for (var i = 0; i < players.length; i++) {
        players[i].assignOrder(i + 1);
    }
}

function preload() {
    ports[0] = loadImage("/coursework/assets/ports/grain.png");
    ports[1] = loadImage("/coursework/assets/ports/wool.png");
    ports[2] = loadImage("/coursework/assets/ports/lumber.png");
    ports[3] = loadImage("/coursework/assets/ports/brick.png");
    ports[4] = loadImage("/coursework/assets/ports/ore.png");
    ports[5] = loadImage("/coursework/assets/ports/null.png");

    diceImgs[0] = loadImage("/coursework/assets/dice/1.png");
    diceImgs[1] = loadImage("/coursework/assets/dice/2.png");
    diceImgs[2] = loadImage("/coursework/assets/dice/3.png");
    diceImgs[3] = loadImage("/coursework/assets/dice/4.png");
    diceImgs[4] = loadImage("/coursework/assets/dice/5.png");
    diceImgs[5] = loadImage("/coursework/assets/dice/6.png");
	
	tileImgs[0][0] = loadImage("/coursework/assets/tiles/style1/grain.png");
    tileImgs[0][1] = loadImage("/coursework/assets/tiles/style1/wool.png");
    tileImgs[0][2] = loadImage("/coursework/assets/tiles/style1/lumber.png");
    tileImgs[0][3] = loadImage("/coursework/assets/tiles/style1/brick.png");
    tileImgs[0][4] = loadImage("/coursework/assets/tiles/style1/ore.png");
    tileImgs[0][5] = loadImage("/coursework/assets/tiles/style1/desert.png");
	
	tileImgs[1][0] = loadImage("/coursework/assets/tiles/style2/grain.png");
    tileImgs[1][1] = loadImage("/coursework/assets/tiles/style2/wool.png");
    tileImgs[1][2] = loadImage("/coursework/assets/tiles/style2/lumber.png");
    tileImgs[1][3] = loadImage("/coursework/assets/tiles/style2/brick.png");
    tileImgs[1][4] = loadImage("/coursework/assets/tiles/style2/ore.png");
    tileImgs[1][5] = loadImage("/coursework/assets/tiles/style2/desert.png");
	
	cardImgs[0] = loadImage("/coursework/assets/cards/soldier.png");
    cardImgs[1] = loadImage("/coursework/assets/cards/victoryPoint.png");
    cardImgs[2] = loadImage("/coursework/assets/cards/road.png");
    cardImgs[3] = loadImage("/coursework/assets/cards/monopoly.png");
    cardImgs[4] = loadImage("/coursework/assets/cards/yop.png");

    diceImg1 = diceImgs[0];
    diceImg2 = diceImgs[0];

    devCard = loadImage("/coursework/assets/misc/devCard.png");
	robberImg = loadImage("/coursework/assets/misc/robber.png");
}

function setup() {
    gameHeight = 700;//document.getElementById("game").offsetHeight;
    createCanvas(gameHeight * 1.5, gameHeight + 60);

    tileSize = gameHeight / 3.5 / boardSize;
	robberImg.resize(0, tileSize);
	
	var board = document.getElementById("result5").innerHTML;
	var ports = document.getElementById("result6").innerHTML;
	var VPN = document.getElementById("result7").innerHTML;
	
	if (board[0] == 'B') {
		randomizeBoard = false;
	}
	
	if (ports[0] == 'B') {
		randomizePorts = false;
	}
	
	winAmount = VPN.split(" ", 1)[0];
	
	robber = new Robber();
    grid = new Grid(boardSize);
    grid.loadImgs();
    grid.generateGrid();
    grid.assignNumbers();
    grid.addToAllNodes();
    buildingSize = tileSize - 5;
	
	for (var i = 0; i < 2; i++) {
		for (let img of tileImgs[i]) {
			img.resize(0, tileSize*1.97);
		}
	}

    nodeHUD = new NodeHUD(0, 0);
    resourceHUD = new ResourceHUD(0, gameHeight - gameHeight / 5);
    diceHUD = new DiceHUD(width - width / 5, 0);
	tradeHUD = new TradeHUD(width - width/5, gameHeight - gameHeight/5);
    infoHUD = new InfoHUD(0, gameHeight + 10);
	cardHUD = new CardHUD(width/2 - width/4, gameHeight/2 - height*0.35, width/2, height*0.7);
	
    colours = [color(255, 0, 0), color(0, 0, 255), color(255, 106, 0), color(255)];
}

function draw() {
    switch (gameState) {
    case "start":
        break;
    case "started":
        background(100, 150, 255);

        if (roundNum <= 2) {
            startPlacements();
        }

        highlightMouse();

        push();
        translate(width / 2, gameHeight / 2);
        drawOcean();
        drawTiles();
        drawPorts();
		
        if (currentPlayer.tempBuildings[currentPlayer.tempBuildings.length-1] != undefined && currentPlayer.tempBuildings[currentPlayer.tempBuildings.length-1].constructor.name == "Road") {
            drawTempBuilding();
            drawBuildings();
        } else {
            drawBuildings();
            drawTempBuilding();
        }
		
		robber.draw();
        pop();

        drawHUDs();

        break;
    case "finished":
        break;
    }

}

function startPlacements() {
    if (!currentPlayer.placing) {
        if (currentPlayer.settlements.length < roundNum) {
            currentPlayer.buyBuilding("Settlement");
        } else if (currentPlayer.roads.length < roundNum) {
            currentPlayer.buyBuilding("Road");
        }
    }

    if (currentPlayer.settlements.length == roundNum && currentPlayer.roads.length == roundNum) {
        if (currentPlayer.settlements.length == 2) {
            var corner = grid.corners.get(currentPlayer.settlements[1].pos.toString());

            for (let t of corner.tiles) {
                for (var i =0; i < 5; i++) {
					var r = Object.values(Type)[i];
					
					if (r == t.type) {
						currentPlayer.resources[i]++;
						resourceCount[i]--;
					}
				}
            }
        }

        endTurn();
    }
}

function drawBuildings() {
    for (let p of players) {
        for (let r of p.roads) {
            r.draw();
        }

        for (let s of p.settlements) {
            s.draw();
        }

        for (let c of p.cities) {
            c.draw();
        }
    }
}

function drawTempBuilding() {
    if (currentPlayer.placing) {
        if (selectedNode != undefined && currentPlayer.tempBuildings[currentPlayer.tempBuildings.length-1] != undefined) {
            currentPlayer.tempBuildings[currentPlayer.tempBuildings.length-1].pos = selectedNode.pos;
        }

        currentPlayer.tempBuildings[currentPlayer.tempBuildings.length-1].draw();
    }
}

function drawHUDs() {
    nodeHUD.draw();
    resourceHUD.draw();
    tradeHUD.draw();
    diceHUD.draw();
    infoHUD.draw();
	cardHUD.draw();
	
	if (robber.stealHUD != undefined)
		robber.stealHUD.draw();
	
	if (tradeHUD.bankerWindow != undefined)
		tradeHUD.bankerWindow.draw();
	
	if (tradeHUD.playerWindow != undefined)
		tradeHUD.playerWindow.draw();
	
	if (halvingHUDs[0] != undefined)
		halvingHUDs[0].draw();
	
	if (adminHUD.show)
		adminHUD.draw();
}

function drawTiles() {
    for (let t of grid.tiles.values()) {
		t.draw();
		t.covered = false;
		
		if (robber.tempPos.equals(t.pos))
			t.covered = true;

        fill(0);
		stroke(255);
		strokeWeight(2);
        textAlign(CENTER, CENTER);
        textSize(32);
        var temp = hexToPixel(t.pos);
        var x = temp.x;
        var y = temp.y;
        text(t.number, x, y);
    }

    /*for (let n of grid.allNodes.values()) {
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(10);
    var temp = hexToPixel(n.pos);
    var x = temp.x;
    var y = temp.y;
    text(n.pos.toString(), x, y);
    }*/
}

function highlightMouse() {
    fill(150);
    stroke(0);
    strokeWeight(0);
    var mousePos = pixelToHex(mouseX - width / 2, mouseY - gameHeight / 2);
    var building = currentPlayer.tempBuildings[currentPlayer.tempBuildings.length-1];

    if (building == undefined)
        selectedNode = getNearestNode(mousePos, typeToSelect);
	else
        selectedNode = getNearestNode(mousePos, typeToSelect, building.constructor.name);
}

function getNearestNode(pos, type, buildingType) {
    var lowestDistance = 100;
    var closestNode = grid.allNodes.get("0,0");

    if (type == "Any" || buildingType == null) {
        for (let n of grid.allNodes.values()) {
            var temp = n.pos.distanceTo(pos);

            if (temp < lowestDistance) {
                lowestDistance = temp;
                closestNode = n;
            }
        }
    } else {
        for (let n of grid.allNodes.values()) {
            var name = n.constructor.name;

            if (name != type)
                continue;

            var allow = false;

            switch (buildingType) {
            case "Settlement":
                if (roundNum <= 2) {
                    allow = true;
                }

                for (let e of n.edges) {
                    if (e.building != "Empty" &&
                        e.building.owner == currentPlayer) {
                        allow = true;
                    }
                }

                for (let c of n.neighbors) {
                    if (c.building != "Empty") {
                        allow = false;
                    }
                }
                break;
            case "Road":
                if (roundNum <= 2) {
                    for (let c of n.corners) {
                        if (c.building == currentPlayer.settlements[roundNum - 1]) {
                            allow = true;
                        }
                    }
                } else {
                    for (let c of n.corners) {
                        if (c.building != "Empty" && c.building.owner == currentPlayer) {
                            allow = true;
                        }
                    }

                    var roadCount = 0;

                    for (let e of n.neighbors) {
                        if (e.building != "Empty" && e.building.owner == currentPlayer) {
                            allow = true;

                            for (let c of n.corners) {
                                for (let ec of e.corners) {
                                    if (c.equals(ec)) {
                                        if (c.building != "Empty" && c.building.owner != currentPlayer) {
                                            allow = false;
                                        }
                                    }
                                }
                            }

                            roadCount++;
                        }
                    }

                    if (roadCount >= 2) {
                        allow = true;
                    }
                }

                break;
            case "City":
                if (n.building.constructor.name == "Settlement" && n.building.owner == currentPlayer) {
                    allow = true;
                }

                break;
			case "Robber":
				if (!n.covered)
					allow = true;
				
				break;
            }

            if (n.building != "Empty" && buildingType != "City")
                allow = false;

            if (!allow)
                continue;

            var temp = n.pos.distanceTo(pos);

            if (temp < lowestDistance) {
                lowestDistance = temp;
                closestNode = n;
            }
        }
    }

    return closestNode;
}

function drawTile(t) {
    var temp = hexToPixel(t.pos);
    var x = temp.x;
    var y = temp.y;
	
    if (t.type == Type.GRAIN) {
        fill(245, 222, 179);
    } else if (t.type == Type.WOOL) {
        fill(216, 255, 233);
    } else if (t.type == Type.LUMBER) {
        fill(45, 122, 54);
    } else if (t.type == Type.BRICK) {
        fill(255, 138, 109);
    } else if (t.type == Type.ORE) {
        fill(99, 99, 99);
    } else if (t.type == Type.DESERT) {
        fill(255, 255, 0);
    }

    drawHex(x, y, tileSize);
}

function drawHex(x, y, size) {
    var w = sqrt(3) * size;
    var h = 2 * size;

    beginShape();
    vertex(x, y + h / 2);
    vertex(x + w / 2, y + h / 4);
    vertex(x + w / 2, y - h / 4);
    vertex(x, y - h / 2);
    vertex(x - w / 2, y - h / 4);
    vertex(x - w / 2, y + h / 4);
    endShape(CLOSE);
}

function drawOcean() {
    push();
    rotate(PI / 2);
    fill(127, 205, 255);
    drawHex(0, 0, tileSize * 6, this.g);
    pop();
}

function hexToPixel(hex) {
    var x = tileSize / grid.scale * (sqrt(3) * hex.q + sqrt(3) / 2 * hex.r);
    var y = tileSize / grid.scale * (3 / 2 * hex.r);
    return createVector(x, y);
}

function pixelToHex(x, y) {
    var q = (grid.scale * (x / sqrt(3) - y / 3) / tileSize);
    var r = (2 * grid.scale / 3 * y / tileSize);
    return new Hex(q, r);
}

function keyPressed() {
	if (mouseX > 0 && mouseX <= width && mouseY > 0 && mouseY <= height) {
		switch (key) {
		case '`':
		case '~':
		case '¬':
			adminHUD.show = !adminHUD.show;
			resourceHUD.setHighlight(!adminHUD.show);
			cardHUD.setHighlight(!adminHUD.show);
			tradeHUD.setHighlight(!adminHUD.show);
			break;
		}
	
		if (keyCode === DELETE) {
			adminHUD.removeBuilding(selectedNode);
		}
	}
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function mouseClicked() {
    if (resourceHUD.buyHUD.show) {
        if (!resourceHUD.buyHUD.hovered) {
            resourceHUD.toggleBuyHUD(true);
            tradeHUD.setHighlight(true);
			cardHUD.setHighlight(true);
        } else if (checkButton(resourceHUD.buyHUD.roadButton)) {
            currentPlayer.buyBuilding("Road");
            resourceHUD.toggleBuyHUD();
			resourceHUD.cancelButton.show = true;
		} else if (checkButton(resourceHUD.buyHUD.devCardButton)) {
			infoHUD.infomation = currentPlayer.name + " bought a development card";
            resourceHUD.toggleBuyHUD();
		} else if (checkButton(resourceHUD.buyHUD.settlementButton)) {
            currentPlayer.buyBuilding("Settlement");
            resourceHUD.toggleBuyHUD();
			resourceHUD.cancelButton.show = true;
		} else if (checkButton(resourceHUD.buyHUD.cityButton)) {
            currentPlayer.buyBuilding("City");
            resourceHUD.toggleBuyHUD();
			resourceHUD.cancelButton.show = true;
		}
	} else if (robber.stealHUD != undefined && robber.stealHUD.show) {	
		for (let b of robber.stealHUD.buttons) {
			if (checkButton(b)) {
				for (let p of players) {
					if (b.key == p.name) {
						robber.steal(p);
					}
				}
				
				if (b.key == "noOne")
					robber.steal();
			}
		}
	} else if (tradeHUD.bankerWindow != undefined && tradeHUD.bankerWindow.show) {
        if (!tradeHUD.bankerWindow.hovered) {
            tradeHUD.destroyBankerHUD();
		}
	} else if (tradeHUD.playerWindow != undefined && tradeHUD.playerWindow.show) {
        if (!tradeHUD.playerWindow.hovered) {
            tradeHUD.destroyPlayerHUD();
		}
	} else if (halvingHUDs[0] != undefined) {
		for (let b of halvingHUDs[0].buttons) {
			if (checkButton(b)) {
				halvingHUDs[0].lowerResource(b);
			} 
		}
    } else if (checkButton(cardHUD.openButton)) {
		cardHUD.show = true;
		tradeHUD.setHighlight(false);
		cardHUD.setHighlight(false);
		resourceHUD.setHighlight(false);
	} else if (cardHUD.show) {
		if (!cardHUD.hovered) {
			cardHUD.show = false;
			tradeHUD.setHighlight(true);
			cardHUD.setHighlight(true);
			resourceHUD.setHighlight(true);
		} else {
			for (let c of cardHUD.cards) {
				if (checkButton(c.button)) {
					c.play();
				}
			}
		}
	} else if (cardHUD.cardHUD != undefined) {	
		for (let b of cardHUD.cardHUD.buttons) {
			if (checkButton(b)) {
				cardHUD.cardHUD.activate(b.key);
			}
		}
	} else {
        if (currentPlayer != undefined && currentPlayer.placing) {
			if (checkButton(resourceHUD.cancelButton)) {
				currentPlayer.placing = false;
				currentPlayer.tempBuildings[currentPlayer.tempBuildings.length-1].cancel();
				currentPlayer.tempBuildings.pop();
				resourceHUD.cancelButton.show = false;
				resourceHUD.setHighlight(true);
				tradeHUD.setHighlight(true);
				cardHUD.setHighlight(true);
				infoHUD.default();
				typeToSelect = "Any";
			} 
			
            currentPlayer.tempBuildings[currentPlayer.tempBuildings.length-1].place();			
        } else if (checkButton(tradeHUD.bankerButton)) { 
			tradeHUD.createBankerHUD();
		} else if (checkButton(tradeHUD.playerButton)) { 
			tradeHUD.createPlayerHUD();
		} else if (adminHUD != undefined && adminHUD.show) {
			for (let b of adminHUD.buttons) {
				if (checkButton(b)) {
					adminHUD.changeResource(b.key);
				}
			}
			
			if (!adminHUD.hovered) {
				adminHUD.show = false;
				resourceHUD.setHighlight(true);
				cardHUD.setHighlight(true);
				tradeHUD.setHighlight(true);
			}
		} else {
            if (checkButton(resourceHUD.endTurnButton)) {
                endTurn();
				resourceHUD.endTurnButton.click();
            }
			
			if (checkButton(resourceHUD.moveRobberButton)) {
				resourceHUD.moveRobberButton.click();
				currentPlayer.moveRobber();
			}

            if (checkButton(resourceHUD.buyButton)) {
                resourceHUD.toggleBuyHUD();
				resourceHUD.buyButton.click();
                tradeHUD.setHighlight(false);
				cardHUD.setHighlight(false);
            }
			
			if (checkButton(resourceHUD.claimArmyButton)) {
				for (let p of players) {
					if (p.hasBiggestArmy) {
						p.victoryPoints -= 2;
						p.hasBiggestArmy = false;
					}
				}
				
				currentPlayer.hasBiggestArmy = true;
				currentPlayer.victoryPoints += 2;
				resourceHUD.claimArmyButton.click();
			}
        }
	}
}

function checkButton(button) {
	var boolean = button.highlight && button.hovered;
	
	if (boolean)
		button.click();
    
	return boolean;
}

function endTurn() {
    if (roundNum == 1 && turnNum == 4) {
        players.reverse();
    } else if (roundNum == 2 && turnNum == 4) {
        players.reverse();
    }

    resourceHUD.selectPlayer((resourceHUD.playerIndex + 1) % players.length);
    infoHUD.default();

    turnNum = turnNum % players.length + 1;

    if (turnNum == 1)
        roundNum++;
	
	if (roundNum > 2 || (roundNum == 2 && turnNum == 4))
        diceHUD.rollDice();
	
    if (roundNum > 2) {
        for (let t of grid.tiles.values()) {
            var tn = t.number;
            var dN = diceHUD.rollNumber;

            if (t.number == diceHUD.diceRoll) {
                t.giveResource();
            }
        }
    }
	
	if (diceHUD.diceRoll == 7 && roundNum > 2) {		
		for (let p of players) {
			if (p.resourceCount() > 7) {
				var w = width/4;
				var h = 60;
				
				for (var i = 0; i < 5; i++) {
					if (p.resources[i] > 0)
						h += 40;
				} 
				
				var x = width/2 - w/2;
				var y = gameHeight/2 - h/2;
				var resources = new Map();
				
				for (var i = 0; i < 5; i++) {
					var r = p.resources[i];
					
					if (r > 0) {
						var key = Object.values(Type)[i];
						resources.set(key, r);
					}
				}
				
			    var halvingHUD = new HalvingHUD(x, y, w, h, p, resources);
				halvingHUDs.push(halvingHUD);
			}
		}
		
		alert("You are moving the robber");
		currentPlayer.moveRobber();
		resourceHUD.cancelButton.toggle();
	}

	for (let p of players) {
		if (p.victoryPoints >= winAmount && lastRound == undefined) {
			alert("Last Round");
			
			lastRound = roundNum+1;
			lastTurn = turnNum;
		}
	}
	
	if (roundNum == lastRound && turnNum == lastTurn) {
		endGame();
	}
}

function drawPorts() {
    for (let p of grid.ports.values()) {
        p.draw();
    }
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function giveResource(player, index, count) {
	for (var i = 0; i < count; i++) {
		if (resourceCount[index] > 0) {
			player.resources[index]++;
			resourceCount[index]--;
		}
	}
}

function endGame() {
	var highestPlayer;
	
	for (let p of players) {
		if (highestPlayer == undefined || p.victoryPoints > highestPlayer.victoryPoints) {
			highestPlayer = p;
		}
	}
	
	if (highestPlayer != undefined && highestPlayer.victoryPoints >= winAmount) {
		alert(highestPlayer.name + " has won");
		
		//location.reload();
	} else {
		lastRound = undefined;
	}
}

function saveGame(index) {	
	var fullObj = {};
	fullObj
	var array = [];

	//tiles
	for (let t of grid.tiles.values()) {
		var obj = {
			pos: [t.pos.q, t.pos.r],
			number: t.number,
			resource: t.type
		};
		
		array.push(obj);		
	}
	
	fullObj.allTiles = array;
	
	//ports
	array = [];
	for (let p of grid.ports) {
		var obj = {
			pos: [p.pos.q, p.pos.r],
			resource: p.type,
			ratio: p.ratio
		};
		
		array.push(obj);		
	}
	
	fullObj.ports = array;
	
	//settlements
	array = [];
	for (let p of players) {
		for (let s of p.settlements) {
			var obj = {
				pos: [s.pos.q, s.pos.r],
				owner: s.owner.name
			};
		
			array.push(obj);		
		}
	}
	
	fullObj.settlements = array;
	
	//cities
	array = [];
	for (let p of players) {
		for (let c of p.cities) {
			var obj = {
				pos: [c.pos.q, c.pos.r],
				owner: c.owner.name
			};
		
			array.push(obj);		
		}
	}
	
	fullObj.cities = array;
	
	//roads
	array = [];
	for (let p of players) {
		for (let r of p.roads) {
			var obj = {
				pos: [r.pos.q, r.pos.r],
				owner: r.owner.name,
				length: r.roadLength
			};
		
			array.push(obj);		
		}
	}
	
	fullObj.roads = array;
	
	//players
	array = [];
	for (let p of players) {
		var obj = {
			name: p.name,
			resources: p.resources,
			victoryPoints: p.victoryPoints,
			hasLongestRoad: p.hasLongestRoad,
			longestRoad: p.longestRoad
		};
		
		array.push(obj);
	} 
	
	fullObj.players = array;
	
	//robber
	var obj = {
		pos: [robber.pos.q, robber.pos.r]
	};
	
	fullObj.robber = obj;
	
	//bankRes
	fullObj.bankRes = resourceCount;
	
	//turn/round Num
	fullObj.turnNum = turnNum;
	fullObj.roundNum = roundNum;
	
	fullObj.winAmount = winAmount;
	fullObj.playerIndex = resourceHUD.playerIndex;
	fullObj.diceRolls = [diceHUD.diceRoll1, diceHUD.diceRoll2];
	fullObj.randomizeBoard = randomizeBoard;
	fullObj.randomizePorts = randomizePorts;
	
	var string = JSON.stringify(fullObj);
	var title = document.getElementById("saveName"+index).value;
	
	if (title != "") {
		saveFile(title+".txt", string, index);
	} else {
		alert("Plase Fill in the name of the file")
	}
}

function saveFile(title, text, index) {
	var userName = document.getElementById("userName").innerHTML;
	
	var data = new FormData();
	data.append("data" , text);
	data.append("userName", userName);
	data.append("title" , title);
	data.append("index" , index);
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("fileName"+index).innerHTML = title;
		}
	};
	
	xhttp.open("POST", "gameSaves/saveGame.php", true);
	xhttp.send(data);
}

function loadFile(filePath) {
	var result = null;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", filePath, false);
	xmlhttp.send();
	
	if (xmlhttp.status==200) {
		result = xmlhttp.responseText;
	}
	
	return result;
}

function loadGame(index) {
	var fileName = document.getElementById("fileName"+index).innerHTML;
	var userName = document.getElementById("userName").innerHTML;
	
	if (fileName == "Empty")
		return;
	
	startGame();
	var filePath = "gameSaves/"+userName+"/"+fileName;
	var string = loadFile(filePath);
	let fullObj = JSON.parse(string);
	
	currentPlayer.tempBuildings = [];
	
	print("Loading Tiles");
	for (let t of fullObj.allTiles) {
		var pos = new Hex(t.pos[0], t.pos[1]);
		var temp = grid.tiles.get(pos.toString());
		var i = Object.values(Type).indexOf(t.resource)
		temp.assign(t.number, Object.values(Type)[i]);
		grid.tiles.set(t.pos, temp);
	}
	
	print("Loading ports");
	for (var i = 0; i < fullObj.ports.length; i++) {
		var p = fullObj.ports[i];
		var temp = grid.ports[i];
		var index = Object.values(Type).indexOf(p.resource)
		temp.assign(Object.values(Type)[index], p.ratio);
		grid.ports[i] = temp;
	}
	
	print("Loading players");
	players = [];
	for (let p of fullObj.players) {
		var temp = new Player(p.name);
		temp.assign(p.resources, p.victoryPoints, p.hasLongestRoad, p.longestRoad);
		players.push(temp);
	}
	
	currentPlayer = players[fullObj.playerIndex];
	
	print("Loading settlements");
	for (let s of fullObj.settlements) {
		var pos = new Hex(s.pos[0], s.pos[1]);
		var temp = new Settlement(pos);
		
		for (let p of players) {
			if (p.name == s.owner) {
				temp.owner = p;
				p.settlements.push(temp);
				grid.corners.get(pos.toString()).building = temp;
			}
		}
	}
	
	print("Loading cities");
	for (let c of fullObj.cities) {
		var pos = new Hex(c.pos[0], c.pos[1]);
		var temp = new City(pos);
		
		for (let p of players) {
			if (p.name == c.owner) {
				temp.owner = p;
				p.cities.push(temp);
				grid.corners.get(pos.toString()).building = temp;
			}
		}
	}
	
	print("Loading roads");
	for (let r of fullObj.roads) {
		var pos = new Hex(r.pos[0], r.pos[1]);
		var temp = new Road(pos);
		
		for (let p of players) {
			if (p.name == r.owner) {
				temp.owner = p;
				p.roads.push(temp);
				grid.edges.get(pos.toString()).building = temp;
			}
		}
	}
	
	print("Loading Stuff");
	var pos = new Hex(fullObj.robber.pos[0], fullObj.robber.pos[1]);
	robber.assign(pos);
	bankRes = fullObj.bankRes;
	turnNum = fullObj.turnNum;
	roundNum = fullObj.roundNum;
	winAmount = fullObj.winAmount;
	diceHUD.assign(fullObj.diceRolls);
	randomizeBoard = fullObj.randomizeBoard;
	randomizePorts = fullObj.randomizePorts;
	
	infoHUD.default();
	
	if (randomizeBoard)
		document.getElementById("result5").innerHTML = "Generated Board";
	else
		document.getElementById("result5").innerHTML = "Default Board";
	
	
	if (randomizePorts)
		document.getElementById("result6").innerHTML = "Generated Ports";
	else
		document.getElementById("result6").innerHTML = "Default Ports";
	
	
	document.getElementById("result7").innerHTML = winAmount+" Victory Points";
}

class HUD {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = width / 5;
        this.height = gameHeight / 5;
        this.buttons = [];
		this.show = true;
    }

    drawBase() {
        rectMode(CORNER);
        strokeWeight(1);
        stroke(0);
        fill(200);
        rect(this.x, this.y, this.width, this.height);
    }

    draw() {
        this.drawBase();
    }

    setHighlight(boolean) {
        for (let b of this.buttons) {
            b.highlight = boolean;
        }
		
		return this.buttons[0].highlight;
    }

    drawButtons() {
        for (let b of this.buttons) {
            b.draw();
        }
    }
}

class NodeHUD extends HUD {
    constructor(x, y) {
        super(x, y);
    }

    draw() {
        this.drawBase();

        if (selectedNode != null) {
            push();
            translate(this.x + 10, this.y + 10);

            strokeWeight(0);
            rectMode(CORNER);
            textAlign(LEFT, TOP);
            textSize(20);
            fill(0);
            var name = selectedNode.constructor.name;

            switch (name) {
            case "Corner":
                text("Junction", 0, 0);

                if (selectedNode.building == "Empty") {
                    text("No Building", 0, 20);
                } else {
                    text("Building: " + selectedNode.building.constructor.name, 0, 20);
                    text("Owned By: " + selectedNode.building.owner.name, 0, 40);
                }
                break;
            case "Edge":
                if (selectedNode.building == "Empty") {
                    text("Path", 0, 0);
                } else {
                    text("Road", 0, 0);
                    text("Owned By: " + selectedNode.building.owner.name, 0, 20);
                    text("Road length: " + selectedNode.building.roadLength, 0, 40);
                }

                break;
            case "Tile":
                text("Tile", 0, 0);
                text("Number: " + selectedNode.number, 0, 20);
                text("Resource: " + selectedNode.type, 0, 40);

                break;
            case "Port":
                text("Port", 0, 0);
                text("Trade: " + selectedNode.type, 0, 20);
                text("Trade Rate: " + selectedNode.ratio + ":1", 0, 40);
				
				if (selectedNode.owner == undefined)
					text("Unowned", 0, 60);
				else 
					text("Tradable by: " + selectedNode.owner.name, 0, 60);

                break;
            }

            pop();
        }
    }
}

class ResourceHUD extends HUD {
    constructor(x, y) {
        super(x, y);
        this.hoveredOverBuyButton = false;
        this.hoveredOverArmyButton = false;
        this.hoveredOverEndButton = false;
        this.playerIndex = 0;
        this.buyHUD = new BuyHUD(width / 2, height / 2 - 35, width / 2, height / 2);
        this.buyHUD.show = false;
		
		this.moveRobberButton = new Button(this.x, nodeHUD.y + nodeHUD.height + 5, this.width*0.7, this.height / 4, "Move Robber");
        this.buyButton = new Button(this.x, this.y - this.height / 2 - 10, this.width / 3 - 5, this.height / 4, "Buy");
        this.claimArmyButton = new Button(this.x, this.y - this.height / 4 - 5, this.width, this.height / 4, "Claim Biggest Army");
        this.endTurnButton = new Button(width - width / 9.5 - 2, gameHeight / 2 - 20, width / 9.5, 40, "End Turn");
		this.cancelButton = new Button(2, gameHeight / 2 - 20, 0.6*this.width, 40, "Cancel");
		this.cancelButton.show = false;
		
		this.buttons.push(this.moveRobberButton);
        this.buttons.push(this.buyButton);
        this.buttons.push(this.claimArmyButton);
        this.buttons.push(this.endTurnButton);
        this.buttons.push(this.cancelButton);
    }

    selectPlayer(index) {
        this.playerIndex = index;
        currentPlayer = players[index];
        infoHUD.default();
    }

    draw() {
        this.drawBase();

        push();
        strokeWeight(0);
        textAlign(LEFT, TOP);
        textSize(18);
        fill(0);

        currentPlayer = players[this.playerIndex];

        text("Name: " + currentPlayer.name, this.x + 10, this.y + 10);
        text("Grain: " + currentPlayer.resources[0], this.x + 10, this.y + 10+gap);
        text("Wool: " + currentPlayer.resources[1], this.x + 10, this.y + 10+gap*2);
        text("Lumber: " + currentPlayer.resources[2], this.x + 10, this.y + 10+gap*3);
        text("Brick: " + currentPlayer.resources[3], this.x + 10, this.y + 10+gap*4);
        text("Ore: " + currentPlayer.resources[4], this.x + 10, this.y + 10+gap*5);
        text("Victory Points: " + currentPlayer.victoryPoints, this.x + 10, this.y + 10+gap*6);

        this.drawButtons();

        if (this.buyHUD.show) {
            this.buyHUD.draw();
        }

        pop();
    }

    toggleBuyHUD() {
        this.buyHUD.show = !this.buyHUD.show;
        this.setHighlight(!this.setHighlight());
		this.cancelButton.highlight = true;
    }
}

class DiceHUD extends HUD {
    constructor(x, y) {
        super(x, y);
        this.diceTimer = -1;
        this.diceImg1 = diceImgs[0];
        this.diceImg2 = diceImgs[0];
        this.diceRoll1 = 1;
        this.diceRoll2 = 1;
        this.diceRoll = 0;
    }

    draw() {
        this.drawBase();
        push();

        strokeWeight(0);
        rectMode(CORNER);
        textAlign(LEFT, TOP);
        textSize(20);
        fill(0);

        if (this.diceTimer <= 0) {
            this.diceImg1 = diceImgs[this.diceRoll1 - 1];
            this.diceImg2 = diceImgs[this.diceRoll2 - 1];

            text("Number: " + this.diceRoll, this.x + 5, this.y + this.height - 22);
        } else if (this.diceTimer % 10 == 0) {
            this.diceImg1 = diceImgs[floor(random(0, 6))];
            this.diceImg2 = diceImgs[floor(random(0, 6))];
        }

        imageMode(CENTER);
        image(this.diceImg1, this.x + this.width / 3.5, this.y + this.height / 2 - 5, this.height * 0.6, this.height * 0.6);
        image(this.diceImg2, this.x + 2.5 * this.width / 3.5, this.y + this.height / 2 - 5, this.height * 0.6, this.height * 0.6);

        pop();
        this.diceTimer--;

        if (roundNum <= 2)
            this.diceTimer = 0;
    }

    rollDice() {
        this.diceTimer = 120;
        this.diceRoll1 = ceil(random(0, 6));
        this.diceRoll2 = ceil(random(0, 6));

        this.diceRoll = this.diceRoll1 + this.diceRoll2;
    }

	assign(diceRolls) {
		this.diceRoll1 = diceRolls[0];
		this.diceRoll2 = diceRolls[1];
        this.diceImg1 = diceImgs[this.diceRoll1-1];
        this.diceImg2 = diceImgs[this.diceRoll2-1];
		this.diceRoll = this.diceRoll1+this.diceRoll2;
	}
}

class InfoHUD extends HUD {
    constructor(x, y) {
        super(x, y);
        this.width = width;
        this.height = 50
            this.infomation = "";
    }

    draw() {
        this.drawBase();

        fill(0);
        textSize(40);
        textAlign(CENTER, CENTER);
        text(this.infomation, width / 2, this.y + this.height / 2);
    }

default () {
        this.infomation = currentPlayer.name + "'s turn";
    }
}

class BuyHUD extends HUD {
    constructor(x, y, width, height) {
        super(x - width / 2, y - height / 2);
        this.width = width;
        this.height = height;
        this.hovered = false;

        this.roadButton = new Button(this.x + this.width / 4 - this.width / 6, this.y + this.height / 4, this.width / 5, this.height / 12, "Buy Road");
        this.devCardButton = new Button(this.x + 3 * this.width / 4 - this.width / 5.4, this.y + this.height / 4, this.width / 2.6, this.height / 12, "Buy Development Card");
        this.settlementButton = new Button(this.x + this.width / 4 - this.width / 6, this.y + 2.9 * this.height / 4, this.width / 3.9, this.height / 12, "Buy Settlement");
        this.cityButton = new Button(this.x + 3 * this.width / 4 - this.width / 6, this.y + 3 * this.height / 4, this.width / 5, this.height / 12, "Buy City");
        
        this.buttons.push(this.roadButton);
        this.buttons.push(this.devCardButton);
        this.buttons.push(this.settlementButton);
        this.buttons.push(this.cityButton);
    }

    draw() {
        this.hovered = false;

        if (mouseX > this.x && mouseX < this.x + this.width) {
            if (mouseY > this.y && mouseY < this.y + this.height) {
                this.hovered = true;
            }
        }

        strokeWeight(1);
        stroke(0);
        fill(200);
        rect(this.x, this.y, this.width / 2, this.height / 2);
        rect(this.x + this.width / 2, this.y, this.width / 2, this.height / 2);
        rect(this.x, this.y + this.height / 2, this.width / 2, this.height / 2);
        rect(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, this.height / 2);

        this.checkPrices()

        this.drawButtons();
        this.drawText();
        this.drawIcons();
    }

    checkPrices() {
        this.roadButton.highlight = true;
        this.devCardButton.highlight = true;
        this.settlementButton.highlight = true;
        this.cityButton.highlight = true;

        var roadString = this.checkPrice(Road.requirements);
        var cardString = this.checkPrice(DevCard.requirements);
        var settlementString = this.checkPrice(Settlement.requirements);
        var cityString = this.checkPrice(City.requirements);

        if (currentPlayer.settlements.length == 0) {
            cityString += "\nCities require a settlement";
        }

        if (roadString != "") {
            this.roadButton.highlight = false;
        }

        if (cardString != "") {
            this.devCardButton.highlight = false;
        }

        if (settlementString != "") {
            this.settlementButton.highlight = false;
        }

        if (cityString != "") {
            this.cityButton.highlight = false;
        }
		
		strokeWeight(0);
        textSize(18)
		textAlign(LEFT, TOP);
		
        text(roadString, this.roadButton.x - 20, this.roadButton.y + this.roadButton.height + 11);
        text(cardString, this.devCardButton.x - 20, this.devCardButton.y + this.devCardButton.height + 11);
        text(settlementString, this.settlementButton.x - 20, this.settlementButton.y + this.settlementButton.height + 11);
        text(cityString, this.cityButton.x - 20, this.cityButton.y + this.cityButton.height + 11);
    }

    checkPrice(reqList) {
        strokeWeight(0);
        fill(0);

        for (let b of this.buttons) {
            b.highlight = true;
        }

        var count = 0;
        var string = "Missing: ";

        for (var i = 0; i < reqList.length; i++) {
            var req = reqList[i];
            var has = currentPlayer.resources[i];

            if (has < req) {
                if (count > 0) {
                    if (count % 2 == 0) {
                        string += "\nMissing: ";
                    } else {
                        string += ", ";
                    }
                }

                string += (req - has) + " " + Object.values(Type)[i];
                count++
            }
        }

        if (count > 0) {
            return string;
        }

        return "";
    }

    drawText() {
        strokeWeight(0);
        textSize(18)
		textAlign(LEFT, TOP);
        fill(0);
        text("Lumber: 1 \nBrick: 1", this.roadButton.x, this.roadButton.y - 55);
        text("Grain: 1\nWool: 1\nOre: 1", this.devCardButton.x, this.devCardButton.y - 77);
        text("Grain: 1      Wool: 1\nLumber: 1   Brick: 1", this.settlementButton.x, this.settlementButton.y - 55);
        text("Grain: 2 \nOre: 3\nSettlement: 1", this.cityButton.x, this.cityButton.y - 77);
    }

    drawIcons() {
        this.drawRoad();
        this.drawCard();
        this.drawSettlement();
        this.drawCity();
    }

    drawRoad() {
        var pos = createVector(this.roadButton.x + this.roadButton.width * 1.5, this.roadButton.y);

        push();
        translate(pos);
        var road = new Road(new Hex(0, 0));
        road.draw();
        pop();
    }

    drawCard() {
        var pos = createVector(this.devCardButton.x + this.devCardButton.width * 0.6, this.devCardButton.y - this.devCardButton.height * 2);
        image(devCard, pos.x, pos.y, this.width / 9, this.width / 9);
    }

    drawSettlement() {
        var pos = createVector(this.settlementButton.x + this.settlementButton.width * 1.2, this.settlementButton.y);

        push();
        translate(pos);
        var settlement = new Settlement(new Hex(0, 0));
        settlement.draw();
        pop();
    }

    drawCity() {
        var pos = createVector(this.cityButton.x + this.cityButton.width * 1.5, this.cityButton.y);

        push();
        translate(pos);
        var city = new City(new Hex(0, 0));
        city.draw();
        pop();
    }
}

class StealHUD extends HUD {
	constructor(x, y, width, height, players) {
		super(x, y);
        this.width = width;
        this.height = height;
        this.hovered = false;
		var buttonHeight = gameHeight/10 - 10;
		
        for (var i = 0; i < players.length; i++) {
			var p = players[i];
			
			var button = new Button(this.x+10, this.y+10+(buttonHeight+10)*i, this.width*0.9, buttonHeight, "Steal from\n" + p.name, p.name);
			this.buttons.push(button);
		}
		
		var noOneButton = new Button(this.x+10, this.y+10+(buttonHeight+10)*players.length, this.width*0.9, buttonHeight, "Steal from\nno one", "noOne");
		this.buttons.push(noOneButton);
	}
	
	draw() {
		super.drawBase();
		this.drawButtons();
	}
}

class TradeHUD extends HUD {
	constructor(x, y) {
        super(x, y);
        this.bankerWindow;
		this.playerWindow;
		
		this.bankerButton = new Button(this.x + 10, this.y + 10, this.width - 20, this.height/2 - 15, "Trade With Bank");
        this.playerButton = new Button(this.x + 10, this.y + this.height/2 + 5, this.width - 20, this.height/2 - 15, "Trade With Player");
		
		this.buttons.push(this.bankerButton);
        this.buttons.push(this.playerButton);
    }
	
	draw() {
		this.drawBase();
		this.drawButtons();
	}
	
	createBankerHUD() {
		var w = width/3;
		var h = gameHeight/5;
		var x = width/2 - w/2;
		var y = gameHeight/2 - h/2;
		
		this.bankerWindow = new BankerWindow(x, y, w, h);
		this.setHighlight();
		resourceHUD.setHighlight();
	}
	
	destroyBankerHUD() {
		this.bankerWindow = null;
		document.getElementById("bankForm").style = "visibility: hidden;"
		this.setHighlight(true);
		resourceHUD.setHighlight(true);
	}

	createPlayerHUD() {
		var w = width/3;
		var h = gameHeight/4;
		var x = width/2 - w/2;
		var y = gameHeight/2 - h/2;
		
		this.playerWindow = new PlayerWindow(x, y, w, h);
		this.setHighlight();
		resourceHUD.setHighlight();
	}
	
	destroyPlayerHUD() {
		this.playerWindow = null;
		document.getElementById("playerForm").style = "visibility: hidden;"
		this.setHighlight(true);
		resourceHUD.setHighlight(true);
	}
}

class BankerWindow extends HUD {
	constructor(x, y, width, height, ports) {
		super(x, y);
        this.width = width;
        this.height = height;
        this.hovered = false;
		this.ratioValue;
		this.selRes;
		
		this.input = document.getElementById("input");
		this.resType1 = document.getElementById("resType1");
		this.ratio = document.getElementById("ratio");
		this.resType2 = document.getElementById("resType2");
		this.output = document.getElementById("output");
		this.form = document.getElementById("bankForm");
		
		this.createForm();
	}
	
	createForm() {
		var ratio = document.getElementById("ratio");
		removeAllChildNodes(ratio);
		
		var portOption = document.createElement("option");
		portOption.setAttribute("value", 4);
		portOption.innerHTML = "4:1";
		ratio.appendChild(portOption);
		
		for (let p of currentPlayer.ports) {
			if (p.ratio == 3) {
				var ratio4 = ratio.childNodes[0];
				ratio.removeChild(ratio4);
			}
			
			var portOption = document.createElement("option");
			portOption.setAttribute("value", p.ratio);
			portOption.innerHTML = p.ratio + ":1";
			ratio.appendChild(portOption);
		}
	}
	
	updateForm() {
		if (this.ratioValue != this.ratio.value)
			this.update();
		
		if (this.selRes != this.resType1.value)
			this.update();
		
		output.innerHTML = this.input.value/this.ratio.value;
	}
	
	update() {
		this.ratioValue = this.ratio.value;
		this.selRes = this.resType1.value;
		this.outRes = this.resType2.value;
		removeAllChildNodes(this.resType1);
		removeAllChildNodes(this.input);
		removeAllChildNodes(this.resType2);
			
		if (this.ratioValue == 2) {
			for (let p of currentPlayer.ports) {
				var index = Object.values(Type).indexOf(p.type);
				
				if (currentPlayer.resources[index] >= this.ratioValue) {
					var resourceOption = document.createElement("option");
					resourceOption.setAttribute("value", p.type);
					resourceOption.innerHTML = p.type;
					this.resType1.appendChild(resourceOption);
				}
			} 
		} else {
			for (var i = 0; i < currentPlayer.resources.length; i++) {
				if (currentPlayer.resources[i] >= this.ratioValue) {
					var resourceOption = document.createElement("option");
					resourceOption.setAttribute("value", Object.values(Type)[i]);
					resourceOption.innerHTML = Object.values(Type)[i];
					this.resType1.appendChild(resourceOption);
				}
			}
		}
		
		for (let res of Object.values(Type)) {
			if (res != this.selRes && res != "Desert") {
				var resourceOption = document.createElement("option");
				resourceOption.setAttribute("value", res);
				resourceOption.innerHTML = res;
				this.resType2.appendChild(resourceOption);
			}
		}
		
		var count = parseInt(this.ratioValue);
		var index = 0;
		var index2 = 0;
		
		for (var i = 0; i < 5; i++) {
			if (this.ratioValue == 2) {
				index = Object.values(Type).indexOf(this.resType1.value);
				index2 = Object.values(Type).indexOf(this.resType2.value);
			} else {
				index = i;
			}
			
			var r = currentPlayer.resources[index];
			var bankResCount = resourceCount[index];
			var bankOutCount = resourceCount[index2];
			
			while (r >= count && r/this.ratioValue <= bankOutCount) {
				var inputOption = document.createElement("option");
				inputOption.setAttribute("value", count);
				inputOption.innerHTML = count;
				input.appendChild(inputOption);
				count += parseInt(this.ratioValue);
			}
		}
	}
	
	draw() {
		this.hovered = false;

        if (mouseX > this.x && mouseX < this.x + this.width) {
            if (mouseY > this.y && mouseY < this.y + this.height) {
                this.hovered = true;
            }
        }
		
		this.drawBase();
		this.drawText();
		this.updateForm();
		
		if (this.show) {
			document.getElementById("bankForm").style = "visibility: visible";
		}
	}
	
	drawText() {
		textAlign(CENTER, CENTER);
		fill(0);
		strokeWeight(0);
		textSize(26);
		text("Trading Window", this.x, this.y, this.width, this.height*0.8);
	}
	
	trade() {		
		if (this.input.value != "" && this.resType1.value != "" && this.ratio.value != "" && this.resType2.value != "") {
			var giveIndex = Object.values(Type).indexOf(this.resType1.value);
			var getIndex = Object.values(Type).indexOf(this.resType2.value);
			
			currentPlayer.resources[giveIndex] -= parseInt(this.input.value);
			currentPlayer.resources[getIndex] += parseInt(this.output.innerHTML);
			
			resourceCount[giveIndex] += parseInt(this.input.value);
			resourceCount[getIndex] -= parseInt(this.output.innerHTML);
			
			this.update();
		}
	}
}

class PlayerWindow extends HUD {
	constructor(x, y, width, height, ports) {
		super(x, y);
        this.width = width;
        this.height = height;
        this.hovered = false;
		this.selRes1, this.selRes2, this.selectedPlayer;
		
		this.lose = document.getElementById("lose");
		this.resType1 = document.getElementById("currentRes");
		this.gain = document.getElementById("gain");
		this.resType2 = document.getElementById("playerRes");
		this.otherPlayers = document.getElementById("otherPlayer");
		this.form = document.getElementById("playerForm");
		
		this.createForm();
	}
	
	createForm() {
		removeAllChildNodes(this.otherPlayers);
			
		for (let p of players) {
			if (p != currentPlayer) {
				var playerOption = document.createElement("option");
				playerOption.setAttribute("value", p.name);
				playerOption.innerHTML = p.name;
				this.otherPlayers.appendChild(playerOption);
			} 
		}
	}
	
	updateForm() {
		if (this.selectedPlayer != this.otherPlayers.value)
			this.updatePlayer();
		
		if (this.selRes1 != this.resType1.value)
			this.updateRes1();
		
		if (this.selRes2 != this.resType2.value)
			this.updateRes2();
	}
	
	updatePlayer() {
		this.selectedPlayer = this.otherPlayers.value;
		removeAllChildNodes(this.resType1);
		removeAllChildNodes(this.resType2);
		
		for (var i = 0; i < 5; i++) {
			var res = Object.values(Type)[i];
			
			if (currentPlayer.resources[i] > 0) {
				var resOption = document.createElement("option");
				resOption.setAttribute("value", res);
				resOption.innerHTML = res;
				this.resType1.appendChild(resOption);
			}
			
			for (let p of players) {
				if (p.name == this.selectedPlayer) {
					if (p.resources[i] > 0) {
						var resOption = document.createElement("option");
						resOption.setAttribute("value", res);
						resOption.innerHTML = res;
						this.resType2.appendChild(resOption);
					}
				}
			}
		}
	}
	
	updateRes1() {
		this.selRes1 = this.resType1.value;
		removeAllChildNodes(this.lose);
		
		var index = Object.values(Type).indexOf(this.selRes1);
		var count = 1;
		
		while (count <= currentPlayer.resources[index]) {
			var resOption = document.createElement("option");
			resOption.setAttribute("value", count);
			resOption.innerHTML = count;
			this.lose.appendChild(resOption);
			count++;
		}
	}
	
	updateRes2() {
		this.selRes2 = this.resType2.value;
		removeAllChildNodes(this.gain);
			
		var index = Object.values(Type).indexOf(this.selRes2);
		var count = 1;
		
		for (let p of players) {
			if (p.name == this.selectedPlayer) {
				while (count <= p.resources[index]) {
					var resOption = document.createElement("option");
					resOption.setAttribute("value", count);
					resOption.innerHTML = count;
					this.gain.appendChild(resOption);
					count++
				}
			}
		}
	}
	
	draw() {
		this.hovered = false;

        if (mouseX > this.x && mouseX < this.x + this.width) {
            if (mouseY > this.y && mouseY < this.y + this.height + 50) {
                this.hovered = true;
            }
        }
		
		this.drawBase();
		this.drawText();
		this.updateForm();
		
		if (this.show) {
			document.getElementById("playerForm").style = "visibility: visible";
		}
	}
	
	drawText() {
		textAlign(CENTER, CENTER);
		fill(0);
		strokeWeight(0);
		textSize(26);
		text("Player Trading Window", this.x, this.y, this.width, this.height*0.8);
	}
	
	trade() {		
		if (this.lose.value != "" && this.resType1.value != "" && this.lose.value != "" && this.resType2.value != "") {
			var giveIndex = Object.values(Type).indexOf(this.resType1.value);
			var getIndex = Object.values(Type).indexOf(this.resType2.value);
			
			currentPlayer.resources[giveIndex] -= parseInt(this.lose.value);
			currentPlayer.resources[getIndex] += parseInt(this.gain.value);
			
			for (let p of players) {
				if (p.name == this.selectedPlayer) {
					p.resources[giveIndex] += parseInt(this.lose.value);
					p.resources[getIndex] -= parseInt(this.gain.value);
				}
			} 
			
			this.updatePlayer();
			this.updateRes1();
			this.updateRes2();
		}
	}
}

class HalvingHUD extends HUD {
	constructor(x, y, width, height, owner, resources) {
		super(x,y);
		this.width = width;
		this.height = height;
		this.owner = owner;
		this.currentNumber = owner.resourceCount();
		this.endNumber = ceil(this.currentNumber/2);
		this.resources = resources;
		this.show = true
		
		for (var i = 0; i < this.resources.size; i++) {
			var w = this.width - 20;
			var h = 40;
			var x = this.x + 10;
			var y = this.y + 50 + h*i
			var string = Array.from(this.resources.keys())[i] + ": " + Array.from(this.resources.values())[i];
			var key = Array.from(this.resources.keys())[i];
		
			var resButton = new Button(x, y, w, h, string, key);
			this.buttons.push(resButton);
		}
	}
	
	draw() {
		this.drawBase();
		this.drawText();
		this.drawButtons();
		
		if (this.currentNumber == this.endNumber)
			halvingHUDs.splice(0, 1);
	}
	
	drawText() {
		textAlign(CENTER, CENTER);
		fill(0);
		strokeWeight(0);
		textSize(20);
		
		var string = this.owner.name;
		var x = this.x + 10;
		var y = this.y + 10;
		var w = this.width;
		var h = 40;
		text(string, x,y,w,h);
	}
	
	lowerResource(button) {
		var index = Object.values(Type).indexOf(button.key);
		
		if (this.owner.resources[index] > 0) { 
			this.currentNumber--;
			var buttonIndex = this.buttons.indexOf(button);
			this.owner.resources[index]--;
			this.resources.set(button.key, this.resources.get(button.key)-1);
			var resCount = Array.from(this.resources.values())[buttonIndex];
			button.string = Array.from(this.resources.keys())[buttonIndex] + ": " + resCount;
		}
	}
}

class MonopolyHUD extends HUD {
	constructor() {
		var buttonSize = 50;
		super(width*0.4, height/2 - buttonSize*2.5 - 5);
		this.width = width*0.2;
		this.height = (buttonSize+5)*5+5;
		this.show = true;
		
		for (var i = 0; i < 5; i ++) {
			var r = Object.values(Type)[i];
			var button = new Button(this.x + 5, this.y+5 + (buttonSize+5)*i, this.width-10, buttonSize, r, r);
			this.buttons.push(button);
		}
	}
	
	draw() {
		this.drawBase();
		this.drawButtons();
	}
	
	activate(resource) {
		var index = Object.values(Type).indexOf(resource);
		var gain = 0;
		
		for (let p of players) {
			gain += p.resources[index];
			p.resources[index] = 0;
		}
		
		currentPlayer.resources[index] += gain;
		cardHUD.destroyCardHUD()
	}
}

class YOPHUD extends MonopolyHUD {
	constructor() {
		super();
		this.clicked = 0;
		
		for (var i = 0; i < 5; i++) {
			if (resourceCount[i] == 0) {
				this.buttons.splice(i, 1);
			}
		}
	}
	
	activate(resource) {
		this.clicked++;
		var index = Object.values(Type).indexOf(resource);
		currentPlayer.resources[index]++;
		resourceCount[index]--;
		
		if (resourceCount[index] == 0) {
			this.buttons.splice(index, 1);
		}
		
		if (this.clicked == 2) {
			cardHUD.destroyCardHUD();
		}
	}
}

class CardHUD extends HUD {
	constructor(x, y, w, h) {
		super(x, y);
		this.width = w;
		this.height = h;
		this.show = false;
		this.cards = [];
		this.hovered = false;
		this.cardHUD;
		
		this.openButton = new Button(diceHUD.x, diceHUD.height + 5, diceHUD.width, 40, "Play Card");		
		
		var w = (this.width-40)/3;
		var h = (this.height-30)/2;
		
		var soldierCard = new Card(this.x + 10, this.y+10, w, h, "Soldier", cardImgs[0]);
		var victoryPointsCard = new Card(this.x + 20 + w, this.y+10, w, h, "Victory Point", cardImgs[1]);
		var roadCard = new Card(this.x + 30 + w*2, this.y+10, w, h, "Build Roads", cardImgs[2]);
		var monopolyCard = new Card(this.x + this.width/2 - 5 - w, this.y + this.height/2 + 5, w, h, "Monopoly", cardImgs[3]);
		var yearOfPlentyCard = new Card(this.x + this.width/2 + 5, this.y + this.height/2 + 5, w, h, "Year of Plenty", cardImgs[4]);
		
		this.cards.push(soldierCard);
		this.cards.push(victoryPointsCard);
		this.cards.push(roadCard);
		this.cards.push(monopolyCard);
		this.cards.push(yearOfPlentyCard);
	}
	
	draw() {
		this.openButton.draw();
		this.hovered = false;
		
		if (mouseX >= this.x && mouseX <= this.x+this.width) {
			if (mouseY >= this.y && mouseY <= this.y+this.height) {
				this.hovered = true;
			}
		}
		
		if (this.cardHUD != undefined) {
			this.cardHUD.draw();
		} 
		
		if (this.show) {
			this.drawBase();
			this.drawCards();
		} 
	}
	
	drawCards() {
		for (let c of this.cards) {
			c.draw();
		} 
	}
	
	setHighlight(boolean) {
		this.openButton.highlight = boolean;
	}

	set(boolean) {
		this.show = boolean;
		tradeHUD.setHighlight(!boolean);
		cardHUD.setHighlight(!boolean);
		resourceHUD.setHighlight(!boolean);
	}

	destroyCardHUD() {
		this.cardHUD = undefined;
	}
}

class AdminHUD extends HUD {
	constructor() {
		super(width*0.15, height*0.15);
		this.height = height*0.7;
		this.width = width*0.7;
		this.show = false;
		
		for (var i = 0; i < players.length; i++) {
			var w = this.width/2-15;
			var h = this.height/ceil(players.length/2)-15;
			var xOffset = this.x+10 + (w+5)*(i%2);
			var yOffset = this.y+10 + (h+5)*floor(i/2);
		
			for (var j = 0; j < 6; j++) {
				var plus = new Button(xOffset + 200, yOffset+35+(28)*j, 21, 21, "+", i+","+j+"+");
				var minus = new Button(xOffset + 230, yOffset+35+(28)*j, 21, 21, "-", i+","+j+"-");
				this.buttons.push(plus);
				this.buttons.push(minus);
			}
		}
	}
	
	drawPlayers() {
		for (var i = 0; i < players.length; i++) {
			var p = players[i];
			
			var width = this.width/2-15;
			var height = this.height/ceil(players.length/2)-15;
			var xOffset = this.x+10 + (width+5)*(i%2);
			var yOffset = this.y+10 + (height+5)*floor(i/2);
			
			var size = 25;
			textSize(size+5);
			textAlign(LEFT, TOP);
			strokeWeight(0)
			fill(0)
			text(p.name, xOffset, yOffset);
			
			for (var j = 0; j < 6; j++) {
				var resName, resNum;

				if (j < 5) {
					resName = Object.values(Type)[j];
					resNum = p.resources[j];
				} else {
					resName = "Victory Points";
					resNum = p.victoryPoints;
				}
				
				textSize(size);
				textAlign(LEFT, TOP);
				text(resName+": "+resNum, xOffset, yOffset+size+12+(size+3)*j);
			}
		}
	}
	
	draw() {
		this.hovered = false;
		
		if (mouseX >= this.x && mouseX <= this.x+this.width) {
			if (mouseY >= this.y && mouseY <= this.y+this.height) {
				this.hovered = true;
			}
		}
		
		this.drawBase();
		this.drawPlayers();
		this.drawButtons();

		resourceHUD.setHighlight(false);
		cardHUD.setHighlight(false);
		tradeHUD.setHighlight(false);
	}
	
	changeResource(key) {
		var playerIndex = key[0];
		var resourceIndex = key[2];
		var sign = key[3];
		
		if (resourceIndex == 5) {
			if (sign == "+")
				players[playerIndex].victoryPoints++;
			else if (sign == "-" && players[playerIndex].victoryPoints > 0)
				players[playerIndex].victoryPoints--;
		} else {
			if (sign == "+") {
				players[playerIndex].resources[resourceIndex]++;
				resourceCount[resourceIndex]--;
			} else if (sign == "-" && players[playerIndex].resources[resourceIndex] > 0) {
				players[playerIndex].resources[resourceIndex]--;
				resourceCount[resourceIndex]++;
			}
		}
	}

	removeBuilding(node) {
		var player = node.building.owner;
		var building = node.building;
		node.building = "Empty";
		
		if (building instanceof Road) {
			var index = player.roads.indexOf(building);
			player.roads.splice(index, 1);
			player.longestRoad = 0;
			
			if (player.hasLongestRoad) {
				player.hasLongestRoad = false;
				player.victoryPoints -= 2;
				longestRoad -= 2;
			}
			
			for (let r of player.roads) {
				r.roadLength = 0;
				player.calcLongestRoad(r);
			}
		} else if (building instanceof Settlement) {
			var index = player.settlements.indexOf(building);
			player.settlements.splice(index, 1);
		} else if (building instanceof City) {
			var index = player.cities.indexOf(building);
			player.cities.splice(index, 1);
		}
	}
}

class Card {
	constructor(x, y, w, h, name, img) {
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
		this.name = name;
		this.img = img;
		
		this.button = new Button(this.x + this.width*0.1, this.y + this.height - this.height/6 - 5, this.width*0.8, this.height/6, "Play");
	}
	
	draw() {
		rectMode(CORNER);
		
		strokeWeight(2);
		fill(255);
		rect(this.x, this.y, this.width, this.height/6);
		
		fill(0);
		strokeWeight(0);
		textAlign(CENTER, CENTER);
		textSize(this.height/12);
		text(this.name, this.x, this.y, this.width, this.height/6);
		
		imageMode(CORNER);
		image(this.img, this.x + this.width*0.15, this.y + this.height/6 + 5, this.width*0.7, this.height*0.6)
		
		this.button.draw();
	}

	play() {
		switch (this.name) {
			case "Soldier":
				currentPlayer.moveRobber();
				break;
			case "Victory Point":
				currentPlayer.victoryPoints++;
				break;
			case "Build Roads":
				currentPlayer.resources[2] += 2;
				currentPlayer.resources[3] += 2;
				cardHUD.set(false);
				currentPlayer.buyBuilding("Road");
				currentPlayer.buyBuilding("Road");
				break;
			case "Monopoly":
				//pick a resource type & take from other players
				cardHUD.cardHUD = new MonopolyHUD();
				cardHUD.set(false);
				break;
			case "Year of Plenty":
				//take two resources
				cardHUD.cardHUD = new YOPHUD();
				cardHUD.set(false);
				break;
		}
	}
}

class Button {
    constructor(x, y, width, height, string, key) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.hovered = false;
        this.string = string;
        this.highlight = true;
        this.show = true;
		this.timer = 0;
		this.colour = color(200);
		this.key = key;
    }

    draw() {
        if (this.show) {
            this.hovered = false;

            if (this.highlight) {
                if (mouseX > this.x && mouseX < this.x + this.width) {
                    if (mouseY > this.y && mouseY < this.y + this.height) {
                        this.hovered = true;
                        fill(0);
                        rect(this.x, this.y, this.width + 2, this.height + 2);
                    }
                }
            }
			
			if (this.timer == 0)
				this.colour = color(230);
			else
				this.timer--;
			
            strokeWeight(1);
            fill(this.colour);
            rect(this.x, this.y, this.width, this.height);
			
            strokeWeight(0);
			textAlign(CENTER, CENTER);
			
			var tSize = this.height*0.55;
			
			if (this.string.length > 10)
				tSize = min(tSize, this.width/this.string.length+10);
			
			if (this.string.includes("\n", 0)) 
				tSize = this.height/2-10;
			
			textSize(tSize);
			
            fill(0);
            text(this.string, this.x, this.y, this.width, this.height);
        }
    }

	toggle() {
		this.show = !this.show;
	}
	
	click() {
		this.timer = 5;
		this.colour = color(180);
	}
}

class Player {
    constructor(name) {
        this.name = name;
        this.resources = [0, 0, 0, 0, 0];
        this.victoryPoints = 0;
        this.rollNumber = 0;
        this.placing = false;
        this.settlements = [];
        this.cities = [];
        this.roads = [];
		this.hasBiggestArmy = false;
		this.hasLongestRoad = false;
		this.ports = [];
		this.tempBuildings = [];
        this.longestRoad = 0;
		this.hasLongestRoad = false;
    }

    assignOrder(order) {
        this.order = order;
        this.colour = colours[order - 1];
    }

    buyBuilding(type) {
        this.placing = true;
        resourceHUD.setHighlight(false);
		tradeHUD.setHighlight(false);
		cardHUD.setHighlight(false);

        if (type == "Settlement") {
            typeToSelect = "Corner";
            this.tempBuildings.push(new Settlement(selectedNode));
        } else if (type == "City") {
            typeToSelect = "Corner";
            this.tempBuildings.push(new City(selectedNode));
        } else if (type == "Road") {
            typeToSelect = "Edge";
            this.tempBuildings.push(new Road(selectedNode));
        }

        infoHUD.infomation = this.name + " is placing a " + type;
    }
	
	moveRobber() {
		robber.tempPos = robber.pos;
		this.placing = true;
		this.tempBuildings.push(robber);
		resourceHUD.cancelButton.show = true;
		resourceHUD.setHighlight(false);
		tradeHUD.setHighlight(false);
		cardHUD.setHighlight(false);
		resourceHUD.cancelButton.highlight = true;
		typeToSelect = "Tile";
	}

	resourceCount() {
		var total = 0;
		
		for (let r of this.resources) {
			total += r;
		} 
		
		return total;
	}
	
	calcLongestRoad(road) {
		var roadLength = 0;
		var cornerRoads = [];
		
		for (let r of this.roads) {
			for (let c of r.node.corners) {
				var roadCount = 0;
				
				for (let e of c.edges) {
					if (e.building instanceof Road && e.building.owner == this) {
						roadCount++;
					}
				}
				
				if (roadCount == 1 && !cornerRoads.includes(r)) 
					cornerRoads.push(r);
			}
		}
		
		for (let r of cornerRoads) {
			roadLength = max(roadLength, this.findLength([], [], r, 1));
		}
		
		if (roadLength == 0) {
			roadLength = this.findLength([], [], road, 1);
		}
		
		if (this.longestRoad < roadLength) {
			this.longestRoad = roadLength;
			
			if (this.longestRoad >= longestRoad +2) {
				for (let p of players) {
					if (p.hasLongestRoad) {
						p.victoryPoints -= 2;
						p.hasLongestRoad = false;
						break;
					}
				}
				
				this.hasLongestRoad = true;
				this.victoryPoints += 2;
				longestRoad = this.longestRoad;
				alert("You have the longest road with a length of: " + this.longestRoad);
			}
		}
	}
	
	findLength(completedRoads, ignore, road, depth) {		
		var pos = hexToPixel(road.pos);
		fill(0, 255, 255);
		circle(pos.x, pos.y, 10);
		
		completedRoads.push(road);
		var tempRoads = [...completedRoads];
		var connectedRoads = [];
		
		for (let e of road.node.neighbors) {
			if (e.building instanceof Road && e.building.owner == this) {
				if (!completedRoads.includes(e.building) && !ignore.includes(e.building)) {
					connectedRoads.push(e.building);
				}
			}
		}
		
		
		if (connectedRoads.length != 0) {
			var newDepth = depth;
			
			for (let r of connectedRoads) {
				newDepth = max(newDepth, this.findLength(tempRoads, connectedRoads, r, depth+1));
			}
			
			depth = newDepth;
		}
		
		road.roadLength = max(road.roadLength, depth);
		return depth;
	}

	assign(resources, victoryPoints, hasLongestRoad, longestRoad) {
		this.resources = resources;
		this.victoryPoints = victoryPoints;
		this.hasLongestRoad = hasLongestRoad;
		this.longestRoad = longestRoad;
		this.order = players.length+1;
        this.colour = colours[this.order-1];
	}
}

class Cube {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    equals(other) {
        if (other == this)
            return true;
        if (!(other instanceof Cube))
            return false;
        var c = other;
        return this.x == c.x && this.y == c.y && this.z == c.z;
    }
}

class Hex {
    constructor(q, r) {
        this.q = q;
        this.r = r;
    }

    set(q, r) {
        this.q = q;
        this.r = r;
    }

    loopNumber() {
        var temp = (Math.abs(this.q) + Math.abs(this.q + this.r) + Math.abs(this.r)) / 2;
        return temp;
    }

    static midpoint(h1, h2) {
        var q = (h1.q + h2.q) / 2;
        var r = (h1.r + h2.r) / 2;
        return new Hex(q, r);
    }

    equals(other) {
        if (other == this)
            return true;
        if (!(other instanceof Hex))
            return false;
        var h = other;
        return this.q == h.q && this.r == h.r;
    }

    toString() {
        var temp = this.q + "," + this.r;
        return temp;
    }

    distanceTo(other) {
        var dist = sqrt(Math.pow(this.q - other.q, 2) + sq(this.r - other.r));
        return dist;
    }
}

class Node {
    constructor(grid, pos) {
        this.pos = pos;
        this.grid = grid;
        this.building = "Empty";
    }

    equals(other) {
        if (other == this)
            return true;
        if (other.constructor.name != this.constructor.name)
            return false;
        var o = other;
        return this.pos.equals(o.pos);
    }
}

class Corner extends Node {
    constructor(grid, pos) {
        super(grid, pos);
        this.tiles = [];
        this.edges = [];
        this.neighbors = [];
    }

    findEdges() {
        var p = this.pos;
        var hexs = [new Hex(p.q - 0.5, p.r - 0.5),
            new Hex(p.q + 1, p.r - 0.5),
            new Hex(p.q - 0.5, p.r + 1),
            new Hex(p.q + 0.5, p.r - 1),
            new Hex(p.q + 0.5, p.r + 0.5),
            new Hex(p.q - 1, p.r + 0.5)];

        for (let h of hexs) {
            var temp = grid.edges.get(h.toString());

            if (temp != undefined) {
                this.edges.push(temp);
            }
        }
    }

    findNeighbors() {
        for (let e of this.edges) {
            for (let n of e.corners) {
                if (!n.equals(this)) {
                    this.neighbors.push(n);
                }
            }
        }
    }
}

class Edge extends Node {
    constructor(grid, pos, corner1, corner2) {
        super(grid, pos);
        this.tiles = [];
        this.corners = [];
        this.corners[0] = corner1;
        this.corners[1] = corner2;
        this.neighbors = [];
    }

    findNeighbors() {
        for (let c of this.corners) {
            for (let e of c.edges) {
                if (!e.equals(this)) {
                    this.neighbors.push(e);
                }
            }
        }
    }

}

class Tile extends Node {
    constructor(grid, pos, neighborHex) {
        super(grid, pos);
        this.neighborHex = neighborHex;
        this.neighbors = [];
        this.edges = [];
        this.corners = [];
        this.type = null;
        this.number = 0;
		this.covered = false;
		this.img;
    }
	
	draw() {
		var pos = hexToPixel(this.pos);
		fill(0);
		strokeWeight(0);
		drawHex(pos.x, pos.y, tileSize+1);
		imageMode(CENTER); 
		image(this.img, pos.x, pos.y);
	}
	
    assignType() {
        var list = grid.tileList;

        if (randomizeBoard) {
            shuffleArray(list);
        }

        this.type = list[list.length - 1];
        list.pop();
		
		if (this.type == Type.DESERT) {
			this.covered = true;
			robber.pos = this.pos;
		}
		
		this.img = tileImgs[styleNum][Object.values(Type).indexOf(this.type)];
    }

    getSharedNeighborPosWith(other) {
        var shared = new ArrayList();
        var t = this;

        if (t.equals(other))
            return neighborHex;

        for (let h in neighborHex) {
            for (let o in neighborHex) {
                if (h.equals(o))
                    shared.add(h);
            }
        }

        return shared;
    }

    giveResource() {
		if (!this.covered) {
			for (let c of this.corners) {
				for (var i = 0; i < Object.values(Type).length; i++) {
					if (this.type == Object.values(Type)[i] && this.type != Type.DESERT) {
						if (c.building instanceof Settlement) {
							giveResource(c.building.owner, i, 1);
						} else if (c.building instanceof City) {
							giveResource(c.building.owner, i, 2);
						}
					}
				}
			}
		}
    }

	assign(number, type) {
		this.number = number;
		this.type = type;
		this.img = tileImgs[styleNum][Object.values(Type).indexOf(type)];
	}
}

class Port extends Node {
    constructor(grid, pos, e, type, img) {
        super(grid, pos);
        this.edge = e;
        this.type = type;
        this.img = img;
        this.ratio = 2;
		this.owner;

        if (type == null) {
            this.ratio = 3;
            this.type = "Any";
        }
    }
	
	draw() {
		var hexStart1 = this.edge.corners[0].pos;
		var hexStart2 = this.edge.corners[1].pos;
		var hexEnd = this.pos;

		var start1 = hexToPixel(hexStart1);
		var start2 = hexToPixel(hexStart2);
		var end = hexToPixel(hexEnd);

		fill(202, 164, 114);
		stroke(202, 164, 114);
		strokeWeight(5);
		line(start1.x, start1.y, end.x, end.y);
		line(start2.x, start2.y, end.x, end.y);

		imageMode(CENTER);
		image(this.img, end.x, end.y);
		
		for (let c of this.edge.corners) {
			if (c.building != "Empty" && this.owner == undefined) {
				this.owner = c.building.owner;
				this.owner.ports.push(this);
			}
		}
	}

	assign(type, ratio) {
		this.type = type;
		if (type == undefined)
			this.type = "Any";
		
		this.ratio = ratio;
		
		if (ratio == 3) {
			this.img = ports[5];
		} else {
			var index = Object.values(Type).indexOf(type);
			this.img = ports[index];
		}
	}
}

class Grid {
    constructor(ringCount) {
        this.tiles = new Map();
        this.edges = new Map();
        this.corners = new Map();
        this.allNodes = new Map();

        this.portsImgs = {};
        this.ports = [];

        this.axialDirections = [];
        this.scale = 3;
        this.tileList = [];

        this.ringCount = ringCount;
        this.axialDirections[0] = new Hex(-this.scale, 0);
        this.axialDirections[1] = new Hex(0, -this.scale);
        this.axialDirections[2] = new Hex(this.scale, -this.scale);
        this.axialDirections[3] = new Hex(this.scale, 0);
        this.axialDirections[4] = new Hex(0, this.scale);
        this.axialDirections[5] = new Hex(-this.scale, this.scale);

        this.createTileList();
    }

    loadImgs() {
        for (let p of ports) {
            p.resize(tileSize * 0.85, 0);
        }

        this.portsImgs[Type.GRAIN] = ports[0];
        this.portsImgs[Type.WOOL] = ports[1];
        this.portsImgs[Type.LUMBER] = ports[2];
        this.portsImgs[Type.BRICK] = ports[3];
        this.portsImgs[Type.ORE] = ports[4];
        this.portsImgs[null] = ports[5];
    }

    createTileList() {
        var G = Type.GRAIN;
        var L = Type.LUMBER;
        var W = Type.WOOL;
        var O = Type.ORE;
        var B = Type.BRICK;
        var D = Type.DESERT;

        this.tileList = [B, W, G, O, W, L, B, O, W, G, G, L, L, B, W, L, G, O, D];
    }

    generateGrid() {
        print("Generating Grid");

        print("Generating Tiles");
        this.generateTiles();
        this.assignTiles();
        print("Finished Generating Tiles");

        print("Generating Corners");
        this.generateCorners();
        print("Finished Generating Corners");

        print("Generating Edges");
        this.generateEdges();
        print("Finished Generating Edges");

        print("Finding Neighbors");
        this.findCornerNeighbors();
        this.findEdgeNeighbors();
        print("Finished Neighbors");

        print("Generating Ports");
        this.generatePorts();
        print("Finished Generating Ports");

        print("Finished Generating Grid");
    }

    generateTiles() {
        this.generateTile(new Hex(0, 0));

        for (var ring = 1; ring < this.ringCount; ring++) {
            this.addLoop(ring);
        }
    }

    assignTiles() {
        for (let t of this.tiles.values()) {
            this.assignNeighbors(t);
            t.assignType();
        }
    }

    generateCorners() {
        for (var t of this.tiles.values()) {
            this.generateCornersFor(t);
        }
    }

    generateEdges() {
        for (var t of this.tiles.values()) {
            this.generateEdgesFor(t);
        }
    }

    findCornerNeighbors() {
        for (let c of this.corners.values()) {
            c.findEdges();
            c.findNeighbors();
        }
    }

    findEdgeNeighbors() {
        for (let e of this.edges.values()) {
            e.findNeighbors();
        }
    }

    generatePorts() {
        var positions = [new Hex(0, -9), new Hex(6, -9), new Hex(9, -6), new Hex(9, 0), new Hex(3, 6), new Hex(-3, 9), new Hex(-9, 9), new Hex(-9, 3), new Hex(-6, -3)];

        var edgePos = ["0,-7.5", "4.5,-7.5", "7.5,-4.5", "7.5,0", "3,4.5", "-3,7.5", "-7.5,7.5", "-7.5,3", "-4.5,-3"];

        var types = [null, Type.GRAIN, Type.ORE, null, Type.WOOL, null, null,
            Type.BRICK, Type.LUMBER];

        if (randomizePorts) {
            shuffleArray(types);
        }

        for (var i = 0; i < positions.length; i++) {
            var s = edgePos[i];
            var e = this.edges.get(s);
            var img = this.portsImgs[types[i]];
            var p = new Port(this, positions[i], e, types[i], img);
            this.ports.push(p);
            this.allNodes.set(p.pos.toString(), p);
        }
    }

    addLoop(ring) {
        var neighborPos = [];

        for (let t of this.tiles.values()) {
            for (let temp of t.neighborHex) {
                neighborPos.push(temp);
            }
        }

        for (var i = neighborPos.length - 1; i >= 0; i--) {
            var pos = neighborPos[i];

            if (pos.loopNumber() != ring * this.scale) {
                neighborPos.splice(i, 1);
            } else {
                this.generateTile(pos);
            }
        }
    }

    generateCornersFor(t) {
        for (var i = 0; i < 6; i++) {
            var theta = i * Math.PI / 3;
            var q = Math.round(t.pos.q + (2 * Math.sin(theta - Math.PI / 6)));
            var r = Math.round(t.pos.r + (2 * Math.cos(theta)));
            var temp = new Hex(q, r);

            var c = new Corner(this, temp);
            var cTemp = this.corners.get(temp.toString());
            this.allNodes.set(temp.toString(), c);

            if (cTemp == null) {
                this.corners.set(temp.toString(), c);
                c.tiles.push(t);
                t.corners[i] = c;
            } else {
                cTemp.tiles.push(t);
                t.corners[i] = cTemp;
            }
        }
    }

    generateEdgesFor(t) {
        for (var i = 0; i < 6; i++) {
            var c1 = t.corners[i];
            var c2 = t.corners[(i + 1) % 6];
            var temp = Hex.midpoint(c1.pos, c2.pos);

            var e = new Edge(this, temp, c1, c2);
            var eTemp = this.edges.get(temp.toString());
            this.allNodes.set(temp.toString(), e);

            if (eTemp == undefined) {
                this.edges.set(temp.toString(), e);
                e.tiles.push(t);
                t.edges[i] = e;
            } else {
                eTemp.tiles.push(t);
                t.edges[i] = e;
            }
        }
    }

    generateTile(pos) {
        var neighborHex = this.findNeighborPos(pos);
        var t = new Tile(this, pos, neighborHex);
        this.tiles.set(pos.toString(), t);
        this.allNodes.set(pos.toString(), t);
        return t;
    }

    findNeighborPos(pos) {
        var temp = [];
        temp[0] = this.hexNeighbor(pos, 0);
        temp[1] = this.hexNeighbor(pos, 1);
        temp[2] = this.hexNeighbor(pos, 2);
        temp[3] = this.hexNeighbor(pos, 3);
        temp[4] = this.hexNeighbor(pos, 4);
        temp[5] = this.hexNeighbor(pos, 5);
        return temp;
    }

    assignNeighbors(t) {
        for (var i = 0; i < t.neighborHex.length; i++) {
            var pos = t.neighborHex[i];
            var n = this.tiles.get(pos.toString());

            if (n != undefined)
                t.neighbors.push(n);
        }
    }

    hexDirection(direction) {
        return this.axialDirections[direction];
    }

    hexNeighbor(hex, direction) {
        var dir = this.hexDirection(direction);
        var temp = new Hex(hex.q + dir.q, hex.r + dir.r);

        return temp;
    }

    cubeToAxial(cube) {
        var q = cube.x;
        var r = cube.z;
        return new Hex(q, r);
    }

    axialToCube(hex) {
        var x = hex.q;
        var z = hex.r;
        var y = -x - z;
        return new Cube(x, y, z);
    }

    getTileCount(i) {
        return 3 * (sq(i, 2) - i) + 1;
    }

    assignNumbers() {
        var numbers = [3, 4, 3, 4, 6, 11, 8, 12, 9, 2, 10, 10, 9, 5, 8, 6, 11, 5];
        var i = 0;
        var number;

        if (randomizeBoard)
            shuffleArray(numbers);

        for (var t of this.tiles.values()) {
            if (t.type == Type.DESERT) {
                number = 7;
            } else {
                number = numbers[i];
                i++;
            }

            t.number = number;
        }

        if (randomizeBoard) {
            for (let t of this.tiles.values()) {
                if (t.number == 6 || t.number == 8) {
                    for (let n of t.neighbors) {
                        if (n.number == 6 || n.number == 8) {
                            var temp = this.getRandomTile()
                            var tNum = temp.number;
                            temp.number = t.number;
                            t.number = tNum;
                            break;
                        }
                    }
                }
            }
        }
    }

    getRandomTile() {
        var correct = false;
        var tilesArray = Array.from(this.tiles.values());
        var temp = null;
        var i = -1;
		
        while (correct === false) {
            i = (i + 1) % 19;
            temp = tilesArray[i];

            if (temp.number != 6 && temp.number != 7 && temp.number != 8) {
                correct = true;

                for (let n of temp.neighbors) {
                    if (n.number == 6 || n.number == 8) {
                        correct = false;
                    }
                }
            }
        }

        return temp;
    }

    addToAllNodes() {
        for (let t of this.tiles.values()) {
            this.allNodes.set(t.pos.toString(), t);
        }

        for (let e of this.edges.values()) {
            this.allNodes.set(e.pos.toString(), e);
        }

        for (let c of this.corners.values()) {
            this.allNodes.set(c.pos.toString(), c);
        }
    }
}

class DevCard {
    static requirements = [1, 1, 0, 0, 1];

    constructor() {}
}

class Building {
    constructor(pos) {
        this.pos = pos;
        this.owner = currentPlayer;
		
		if (this.pos != null)
			this.node = grid.allNodes.get(this.pos.toString());
    }
	
	cancel() {
		
	}
	
    place() {
        this.pos = selectedNode.pos;
		this.node = grid.allNodes.get(this.pos.toString());
		this.owner.tempBuildings.pop();
		selectedNode.building = this;
		
		if (this.owner.tempBuildings.length == 0) {
			resourceHUD.setHighlight(true);
			tradeHUD.setHighlight(true);
			cardHUD.setHighlight(true);
			this.owner.placing = false;
			typeToSelect = "Any";
			infoHUD.default();
			resourceHUD.cancelButton.show = false;
		}

        if (roundNum > 2) {
            for (var i = 0; i < this.requirements.length; i++) {
                currentPlayer.resources[i] -= this.requirements[i];
				resourceCount[i] += this.requirements[i];
            }
        }
    }
}

class Settlement extends Building {
    static requirements = [1, 1, 1, 1, 0];

    constructor(pos) {
        super(pos);
        this.requirements = Settlement.requirements;
    }

    draw() {
        push();
        var size = buildingSize / 6;

        var px = hexToPixel(this.pos);
        translate(px.x - size, px.y - size * 1.5);

        fill(this.owner.colour);
        stroke(0);
        strokeWeight(size / 4);

        beginShape();
        vertex(0, size);
        vertex(0, 3 * size);
        vertex(2 * size, 3 * size);
        vertex(2 * size, size);
        vertex(size, 0);
        endShape(CLOSE);

        pop();
    }

    place() {
        super.place();
        this.owner.settlements.push(this);
		this.owner.victoryPoints += 1;
    }
}

class City extends Building {
    static requirements = [2, 0, 0, 0, 3];

    constructor(pos) {
        super(pos);
        this.requirements = City.requirements;
    }

    draw() {
        push();
        var size = buildingSize / 6;

        var px = hexToPixel(this.pos);
        translate(px.x - size, px.y - size * 2.5);

        fill(this.owner.colour);
        stroke(0);
        strokeWeight(size / 4);

        beginShape();
        vertex(0, size);
        vertex(0, 4 * size);
        vertex(3 * size, 4 * size);
        vertex(3 * size, 2 * size);
        vertex(2 * size, 2 * size);
        vertex(2 * size, size);
        vertex(size, 0);
        endShape(CLOSE);

        pop();
    }

    place() {
        super.place();
        this.owner.cities.push(this);

        for (var i = this.owner.settlements.length - 1; i >= 0; i--) {
            var s = this.owner.settlements[i];

            if (s.pos.equals(this.pos)) {
                this.owner.settlements.splice(i, 1);
            }
        }
		
		this.owner.victoryPoints += 1;
    }
}

class Road extends Building {
    static requirements = [0, 0, 1, 1, 0];

    constructor(pos) {
        super(pos);
        this.requirements = Road.requirements;
        this.roadLength = 1;
    }

    draw() {
        this.findAngle();

        push();
        var px = hexToPixel(this.pos);
        translate(px.x, px.y);
        rotate(this.angle);

        fill(this.owner.colour);
        stroke(0);
        strokeWeight(2);

        rectMode(CENTER);
        rect(0, 0, buildingSize, buildingSize / 6);
        rectMode(CORNER);
        pop();
    }

    findAngle() {
        if (this.pos.r % 1 == 0) {
            this.angle = PI / 2;
        } else {
            if (this.pos.q % 1 == 0) {
                this.angle = -PI / 6;
            } else {
                this.angle = PI / 6;
            }
        }
    }

    place() {
        super.place();
        this.owner.roads.push(this);
		this.owner.calcLongestRoad(this);
    }
}

class Robber {
	constructor() {
		this.pos = new Hex(0,0);
		this.tempPos = this.pos;
		this.stealHUD;
	}
	
	draw() {
		var coords = hexToPixel(this.pos);
		image(robberImg, coords.x, coords.y)
	}
	
	place() {
		this.tempPos = this.pos;
		currentPlayer.placing = false;
		resourceHUD.cancelButton.show = false;
		currentPlayer.tempBuildings.pop();
		
		var stealFrom = [];
		var t = grid.tiles.get(this.pos.toString());
		
		for (let c of t.corners) {
			if (c.building != "Empty") {
				if (!stealFrom.includes(c.building.owner)) {
					if (c.building.owner != currentPlayer) {
						if (c.building.owner.resourceCount() > 0) {
							stealFrom.push(c.building.owner);
						}
					}
				}
			}
		}
		
		var hudHeight = (stealFrom.length+1)*(gameHeight/10) + 10;
		this.stealHUD = new StealHUD(width*0.4, gameHeight/2-(hudHeight/2), width*0.2, hudHeight, stealFrom);
	}
	
	cancel() {
		this.pos = this.tempPos;
	}
	
	steal(player) {
		if (player != null) {
			var index = floor(random(0,5));
						
			while (player.resources[index] <= 0) {
				index = floor(random(0,5));
			}
						
			player.resources[index]--;
			currentPlayer.resources[index]++;
		}
		
		this.stealHUD = null;
		typeToSelect = "Any";
		resourceHUD.setHighlight(true);
		tradeHUD.setHighlight(true);
		cardHUD.setHighlight(true);
	}
	
	assign(pos) {
		this.pos = pos;
		grid.tiles.get(pos.toString()).covered = true;
	}
}