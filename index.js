(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"index_atlas_1", frames: [[0,0,214,95]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.gotoAndPlay = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_1 = function() {
	this.initialize(ss["index_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Symbol59 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_1();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,107,47.5);


(lib.mapHolder = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(51,51,51,0.004)").s().p("Egu3AjKMAAAhGTMBdvAAAMAAABGTg");
	this.shape.setTransform(300,225);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.mapHolder, new cjs.Rectangle(0,0,600,450), null);


// stage content:
(lib.index = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0];
	this.isSingleFrame = false;
	// timeline functions:
	this.frame_0 = function() {
		if(this.isSingleFrame) {
			return;
		}
		if(this.totalFrames == 1) {
			this.isSingleFrame = true;
		}
		createjs.Touch.enable(stage);
		stage.mouseChildren = true;
		this.stop();
		
		var gameStage = this;
		var questionTxt = gameStage.question;
		var feedbackTxt = gameStage.feedback;
		var resetBtn = gameStage.resetBtn;
		var mapHolder = gameStage.mapHolder;
		
		resetBtn.visible = false;
		
		var points = {};
		var questions = [];
		var currentQuestion = 0;
		
		questionTxt.text = "⏳ جاري تحميل البيانات...";
		feedbackTxt.text = "";
		
		var queue = new createjs.LoadQueue();
		queue.on("fileload", handleFileLoad);
		queue.on("complete", handleComplete);
		queue.on("error", handleError);
		
		try {
		  var xhr = new XMLHttpRequest();
		  xhr.open("GET", "data.json", false);
		  xhr.send();
		  if (xhr.status === 200) {
		    try {
		      var parsed = JSON.parse(xhr.responseText);
		      queue.loadFile({ id: "data", src: "data.json" });
		    } catch (jsonErr) {
		      console.error("❌ خطأ في صيغة JSON:", jsonErr.message);
		      questionTxt.text = "⚠️ خطأ في صيغة ملف JSON";
		      return;
		    }
		  } else {
		    questionTxt.text = "❌ تعذر العثور على ملف data.json";
		    return;
		  }
		} catch (xhrErr) {
		  console.error("❌ فشل تحميل JSON:", xhrErr);
		  questionTxt.text = "❌ فشل تحميل ملف JSON";
		  return;
		}
		
		function handleFileLoad(evt) {
		  if (evt.item.id === "data") {
		    var data = evt.result;
		
		    if (!data || typeof data !== "object") {
		      questionTxt.text = "❌ JSON غير صالح أو فارغ";
		      return;
		    }
		
		    console.log("✅ JSON محمل:", data);
		
		    questions = data.questions || [];
		    var mapPath = data.mapImage;
		    var pointsData = data.points;
		
		    if (!mapPath || typeof mapPath !== "string") {
		      questionTxt.text = "⚠️ ملف JSON لا يحتوي على mapImage الصحيح";
		      return;
		    }
		
		    if (!pointsData || typeof pointsData !== "object") {
		      questionTxt.text = "⚠️ لم يتم العثور على (points) داخل JSON";
		      return;
		    }
		
		    queue.loadFile({ id: "mapImage", src: mapPath });
		
		    createPoints(pointsData);
		  }
		
		  if (evt.item.id === "mapImage") {
		    var img = evt.result;
		    if (img) {
		      loadMapIntoHolder(img);
		    } else {
		      questionTxt.text = "❌ فشل تحميل صورة الخريطة";
		    }
		  }
		}
		
		function handleComplete() {
		  console.log("🏁 اكتمل التحميل");
		
		  if (questions.length > 0) {
		    questions.sort(() => Math.random() - 0.5);
		    startQuestion();
		  } else {
		    questionTxt.text = "⚠️ لم يتم تحميل أي أسئلة من JSON";
		  }
		}
		
		function handleError(evt) {
		  console.error("⚠️ خطأ في التحميل:", evt.text);
		  questionTxt.text = "❌ حدث خطأ أثناء تحميل البيانات أو الصورة";
		}
		
		// ------------------------------
		// ------------------------------
		function createPoints(pointsData) {
		  Object.keys(pointsData).forEach(function(key) {
		    var pData = pointsData[key];
		
		    if (typeof pData.x !== "number" || typeof pData.y !== "number") {
		      console.warn("⚠️ نقطة غير صالحة:", key);
		      return;
		    }
		
		    var shape = new createjs.Shape();
		    shape.graphics.beginFill("#ffcc00").drawCircle(0, 0, 10);
		    shape.x = pData.x;
		    shape.y = pData.y;
		    shape.name = key;
		    shape.cursor = "pointer";
		
		    createjs.Tween.get(shape, { loop: true })
		      .to({ scaleX: 1.2, scaleY: 1.2 }, 700, createjs.Ease.sineInOut)
		      .to({ scaleX: 1, scaleY: 1 }, 700, createjs.Ease.sineInOut);
		
		    gameStage.addChild(shape);
		    points[key] = shape;
		  });
		}
		
		// ------------------------------
		// ------------------------------
		function loadMapIntoHolder(img) {
		  if (!mapHolder) {
		    console.error("❌ لا يوجد mapHolder");
		    questionTxt.text = "⚠️ لا يوجد عنصر mapHolder ";
		    return;
		  }
		
		  mapHolder.removeAllChildren();
		
		  var bmp = new createjs.Bitmap(img);
		  var iw = img.width;
		  var ih = img.height;
		
		  var holderBounds = mapHolder.getBounds() || mapHolder.nominalBounds;
		  var holderW = holderBounds ? holderBounds.width : 400;
		  var holderH = holderBounds ? holderBounds.height : 300;
		
		  var scale = Math.min(holderW / iw, holderH / ih);
		  bmp.scaleX = bmp.scaleY = scale;
		  bmp.x = (holderW - iw * scale) / 2;
		  bmp.y = (holderH - ih * scale) / 2;
		
		  mapHolder.addChild(bmp);
		  bmp.alpha = 0;
		  createjs.Tween.get(bmp).to({ alpha: 1 }, 600);
		}
		
		// ------------------------------
		// ------------------------------
		function startQuestion() {
		  if (!questions || questions.length === 0) {
		    questionTxt.text = "❌ لا توجد بيانات أسئلة";
		    return;
		  }
		
		  feedbackTxt.text = "";
		  var q = questions[currentQuestion];
		  questionTxt.text = q.name;
		
		  Object.values(points).forEach(function(p) {
		    p.mouseEnabled = true;
		    p.alpha = 1;
		    p.shadow = null;
		    p.removeAllEventListeners("click");
		    p.on("click", function() {
		      handleAnswer(p.name);
		    });
		  });
		}
		
		// ------------------------------
		// ------------------------------
		function handleAnswer(selectedName) {
		  var correct = questions[currentQuestion].answer;
		
		  if (selectedName === correct) {
		    feedbackTxt.text = "أحسنت ✅";
		    createjs.Sound.play("correctSound");
		    showGlow(selectedName, "#00FF00");
		    Object.values(points).forEach(p => (p.mouseEnabled = false));
		    setTimeout(() => {
		      feedbackTxt.text = "";
		      currentQuestion++;
		      if (currentQuestion < questions.length) startQuestion();
		      else showEndMessage();
		    }, 1000);
		  } else {
		    feedbackTxt.text = "خطأ ❌";
		    createjs.Sound.play("wrongSound");
		    showGlow(selectedName, "#FF0000");
		    setTimeout(() => {
		      feedbackTxt.text = "";
		    }, 1000);
		  }
		}
		
		// ------------------------------
		// ------------------------------
		function showGlow(pointName, color) {
		  var p = points[pointName];
		  if (!p) return;
		  p.shadow = new createjs.Shadow(color, 0, 0, 20);
		  setTimeout(() => {
		    p.shadow = null;
		    stage.update();
		  }, 1000);
		}
		
		// ------------------------------
		// ------------------------------
		function showEndMessage() {
		  questionTxt.text = "انتهت اللعبة";
		  feedbackTxt.text = "رائع! 👏";
		  resetBtn.visible = true;
		}
		
		// ------------------------------
		// ------------------------------
		function reset() {
		  createjs.Sound.play("ClickSound");
		  feedbackTxt.text = "";
		  questionTxt.text = "";
		  resetBtn.visible = false;
		  Object.values(points).forEach(p => {
		    p.shadow = null;
		    p.alpha = 1;
		    p.mouseEnabled = true;
		    p.cursor = "pointer";
		  });
		  questions.sort(() => Math.random() - 0.5);
		  currentQuestion = 0;
		  startQuestion();
		}
		
		if (resetBtn) {
		  resetBtn.cursor = "pointer";
		  resetBtn.addEventListener("click", reset);
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// flash0_ai
	this.resetBtn = new lib.Symbol59();
	this.resetBtn.name = "resetBtn";
	this.resetBtn.setTransform(923.1,343.1,1,1,0,0,0,53.6,23.9);
	new cjs.ButtonHelper(this.resetBtn, 0, 1, 1);

	this.feedback = new cjs.Text("", "25px 'Noto Sans Arabic SemiBold'", "#333333");
	this.feedback.name = "feedback";
	this.feedback.lineHeight = 56;
	this.feedback.lineWidth = 139;
	this.feedback.parent = this;
	this.feedback.setTransform(859.05,135.2);

	this.question = new cjs.Text("", "25px 'Noto Sans Arabic SemiBold'", "#333333");
	this.question.name = "question";
	this.question.textAlign = "center";
	this.question.lineHeight = 54;
	this.question.lineWidth = 284;
	this.question.parent = this;
	this.question.setTransform(544.25,53.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.question},{t:this.feedback},{t:this.resetBtn}]}).wait(1));

	// Layer_1
	this.mapHolder = new lib.mapHolder();
	this.mapHolder.name = "mapHolder";
	this.mapHolder.setTransform(523,335,1,1,0,0,0,300,225);

	this.timeline.addTween(cjs.Tween.get(this.mapHolder).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(735,339.8,265,220.2);
// library properties:
lib.properties = {
	id: '0BAB9D2A768A8345A5F2AB5D96FC43BA',
	width: 1024,
	height: 576,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/index_atlas_1.png?1762938376065", id:"index_atlas_1"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['0BAB9D2A768A8345A5F2AB5D96FC43BA'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;