
export const tvSpecs = [
  { name: "displayType", label: "Display Type" },
  { name: "screenSize", label: "Screen Size (inches)" },
  { name: "displayResolution", label: "Display Resolution" },
  { name: "refreshRate", label: "Refresh Rate (Hz)" },
  { name: "hfr", label: "High Frame Rate (HFR)" },
  { name: "wideColorGamut", label: "Wide Color Gamut (DCI-P3, Rec.2020)", type: "checkbox" },
  { name: "colorBooster", label: "Color Booster/Quantum HDR/Quantum Matrix" },
  { name: "peakBrightness", label: "Peak Brightness (nits)" },
  { name: "dimmingTechnology", label: "Dimming Technology" },
  { name: "antiGlare", label: "Anti-Glare/Glare-Free Technology", type: "checkbox" },
  { name: "contrastEnhancer", label: "Contrast Enhancer / High Contrast" },
  { name: "dynamicToneMapping", label: "Dynamic Tone Mapping (Pro)" },
  { name: "aiPicture", label: "AI Picture/AI Upscaling/Adaptive Picture" },
  { name: "aiGenreSelection", label: "AI Genre Detection", type: "checkbox" },
  { name: "pantoneValidation", label: "Pantone Validated Color", type: "checkbox" },
  { name: "hdr", label: "HDR (HDR10, HDR10+, HLG, Dolby Vision IQ)" },
  { name: "visionAI", label: "Vision AI/Environment Sensing", type: "checkbox" },
  { name: "colorDepth", label: "Color Depth (bit, e.g., 10-bit, 1B+ colors)" },
  { name: "pictureProcessor", label: "Picture Processor/Generation" },
  { name: "filmmakerMode", label: "Filmmaker Mode", type: "checkbox" },
  { name: "hgigMode", label: "HGIG Mode", type: "checkbox" },
  { name: "pictureMode", label: "Picture Mode Presets" },
  { name: "speakerSystem", label: "Speaker System (Channels)" },
  { name: "audioOutput", label: "Audio Output (Wattage)" },
  { name: "dolbyAtmos", label: "Dolby Atmos", type: "checkbox" },
  { name: "dtsX", label: "DTS:X, DTS Virtual:X", type: "checkbox" },
  { name: "objectTrackingSound", label: "Object Tracking Sound", type: "checkbox" },
  { name: "aiSound", label: "AI Sound/AI Acoustic Tuning", type: "checkbox" },
  { name: "clearVoicePro", label: "Clear Voice Pro/Voice Enhancement", type: "checkbox" },
  { name: "wisaReady", label: "WiSA Ready", type: "checkbox" },
  { name: "bluetoothSurroundReady", label: "Bluetooth Surround Ready", type: "checkbox" },
  { name: "audioCodec", label: "Audio Codec Support" },
  { name: "bluetoothSupport", label: "Bluetooth Version/Support" },
  { name: "simultaneousAudioOutput", label: "Simultaneous Audio Output", type: "checkbox" },
  { name: "speakerDirection", label: "Speaker Direction (down/up/side-firing)" },
  { name: "hdmiArc", label: "HDMI ARC/eARC Support" },
  { name: "spdif", label: "SPDIF (Optical Audio)" },
  { name: "multiroomAudio", label: "Multiroom & Soundbar Sync", type: "checkbox" },
  { name: "hdmiInputs", label: "HDMI Inputs (Number & Version)" },
  { name: "usbInputs", label: "USB Inputs (Number & Version)" },
  { name: "ethernetInput", label: "Ethernet (RJ45)" },
  { name: "wifi", label: "Wi-Fi Version" },
  { name: "rfInput", label: "RF Input (Antenna)" },
  { name: "vesaMounting", label: "VESA Mounting (WxH, mm)" },
  { name: "oneConnectBox", label: "One Connect Box / External AV Box", type: "checkbox" },
  { name: "hdmi21", label: "HDMI 2.1 Support", type: "checkbox" },
  { name: "vrr", label: "Variable Refresh Rate (VRR)", type: "checkbox" },
  { name: "allm", label: "Auto Low Latency Mode (ALLM)", type: "checkbox" },
  { name: "gSyncCompatible", label: "Nvidia G-Sync Compatible", type: "checkbox" },
  { name: "freeSyncCompatible", label: "AMD FreeSync Compatible", type: "checkbox" },
  { name: "gameOptimizer", label: "Game Optimizer/Game Bar", type: "checkbox" },
  { name: "fastSwitchInput", label: "Fast Switch Input", type: "checkbox" },
  { name: "gameMode", label: "Game Mode/Low Input Lag", type: "checkbox" },
  { name: "cloudGaming", label: "Cloud Gaming Platform Integration", type: "checkbox" },
  { name: "multiView", label: "Multi View/Picture-in-Picture", type: "checkbox" },
  { name: "operatingSystem", label: "Operating System (webOS, Tizen, Google TV, etc.)" },
  { name: "voiceAssistant", label: "Voice Assistant (Alexa, Google, Bixby, etc.)" },
  { name: "handsFreeVoiceControl", label: "Hands-free Voice Control", type: "checkbox" },
  { name: "intelligentVoiceRecognition", label: "Intelligent Voice Recognition", type: "checkbox" },
  { name: "clickToSearch", label: "Click To Search (Content-Aware Search)", type: "checkbox" },
  { name: "liveTranslate", label: "Live Translate (Real-Time Translation)", type: "checkbox" },
  { name: "multiUserProfiles", label: "Multi-User Profiles", type: "checkbox" },
  { name: "magicRemoteControl", label: "Magic Remote/Remote Type" },
  { name: "remoteControlApp", label: "Smartphone Remote App", type: "checkbox" },
  { name: "familySettings", label: "Family Settings/Parental Controls", type: "checkbox" },
  { name: "artGallery", label: "Art Gallery/Ambient/Art Mode", type: "checkbox" },
  { name: "streamingChannels", label: "Streaming Channels/Integrated FAST Services" },
  { name: "webBrowser", label: "Full Web Browser", type: "checkbox" },
  { name: "socialApps", label: "Social Apps (Facebook, TikTok, etc.)", type: "checkbox" },
  { name: "airplay2", label: "Apple Airplay2 Support", type: "checkbox" },
  { name: "roomToRoomShare", label: "Room-to-Room Share", type: "checkbox" },
  { name: "usbCameraCompatible", label: "USB Camera Compatibility/Video Call Support", type: "checkbox" },
  { name: "petCareMode", label: "Pet Care/Pet Sitter Mode", type: "checkbox" },
  { name: "eyeComfortMode", label: "Eye Care/Eye Comfort/Blue Light Reduction", type: "checkbox" },
  { name: "ambientLightSensors", label: "Ambient Light Sensors", type: "checkbox" },
  { name: "accessibilityFeatures", label: "Accessibility (High Contrast/Gray Scale/Invert Colors)", type: "checkbox" },
  { name: "irBlaster", label: "IR Blaster", type: "checkbox" },
  { name: "powerSupply", label: "Power Supply (Voltage/Hz/Wattage)" },
  { name: "standbyPowerConsumption", label: "Standby Power Consumption (Wattage)" },
  { name: "tvDimensionsWithoutStand", label: "TV Dimensions without Stand (WxHxD, mm)" },
  { name: "tvDimensionsWithStand", label: "TV Dimensions with Stand (WxHxD, mm)" },
  { name: "packagingDimensions", label: "Packaging Dimensions (WxHxD, mm)" },
  { name: "tvWeightWithoutStand", label: "TV Weight without Stand (kg)" },
  { name: "tvWeightWithStand", label: "TV Weight with Stand (kg)" },
  { name: "packagingWeight", label: "Packaging Weight (kg)" },
  { name: "tvStand", label: "TV Stand Dimensions (WxD, mm)" }
]




export const refrigeratorSpecs = [
  { name: "dimensions", label: "Dimensions (WxDxH, mm or cm)" },
  { name: "productWeight", label: "Product Weight (kg)" },
  { name: "packingWeight", label: "Packing Weight (kg)" },
  { name: "storageVolumeTotal", label: "Storage Volume (Total, L)" },
  { name: "storageVolumeRefrigerator", label: "Storage Volume (Refrigerator, L)" },
  { name: "storageVolumeFreezer", label: "Storage Volume (Freezer, L)" },
  { name: "numberOfDoors", label: "Number of Doors" },
  { name: "refrigeratorType", label: "Refrigerator Type (Single/Double/French/Side-by-Side)" },
  { name: "defrostType", label: "Defrosting Type (Frost Free, Direct Cool)" },
  { name: "compressorType", label: "Compressor Type (Inverter, Linear Inverter, Reciprocating)" },
  { name: "coolingTechnology", label: "Cooling Technology (Multi Air Flow, Door Cooling+, Twin Cooling, Express Freeze)" },
  { name: "temperatureControl", label: "Temperature Control Type (Digital, Manual)" },
  { name: "internalTemperatureDisplay", label: "Internal Temperature Display", type: "checkbox" },
  { name: "externalDisplay", label: "External LED/LCD Display", type: "checkbox" },
  { name: "energyConsumption", label: "Energy Consumption (kWh/year or units/day)" },
  { name: "energyGrade", label: "Energy Grade/Label (Star Rating)" },
  { name: "beeRatingYear", label: "BEE Rating Year" },
  { name: "wifi", label: "Wi-Fi (Smart Control/ThinQ/SmartThings)", type: "checkbox" },
  { name: "smartDiagnosis", label: "Smart Diagnosis", type: "checkbox" },
  { name: "voiceAssistantIntegration", label: "Voice Assistant Integration", type: "checkbox" },
  { name: "doorCooling", label: "Door Cooling+/Ice Beam Cooling", type: "checkbox" },
  { name: "multiAirFlow", label: "Multi Air Flow", type: "checkbox" },
  { name: "convertible", label: "Convertible Feature (Freezer to Refrigerator)", type: "checkbox" },
  { name: "expressFreeze", label: "Express Freeze / Power Freeze", type: "checkbox" },
  { name: "curdMaestro", label: "Curd Maestro or Dairy/Fermentation Compartment", type: "checkbox" },
  { name: "storageFeatures", label: "Storage Features (Adjustable Shelves, Bottle Rack, Egg Tray, Large Vegetable Crisper, Pull-out Drawers)" },
  { name: "shelfMaterial", label: "Shelf Material (Toughened Glass, Plastic)" },
  { name: "temperedGlassShelves", label: "Tempered/Toughened Glass Shelves", type: "checkbox" },
  { name: "doorMaterial", label: "Door Material (Steel, Glass, etc.)" },
  { name: "doorFinish", label: "Door Finish (Matte, Glossy, Stainless, PCM, Glass, Floral)" },
  { name: "handleType", label: "Handle Type" },
  { name: "doorAlarm", label: "Door Alarm", type: "checkbox" },
  { name: "childLock", label: "Child Lock", type: "checkbox" },
  { name: "bottleRack", label: "Bottle Rack Feature", type: "checkbox" },
  { name: "iceMakerType", label: "Ice Maker/Tray Type (Twist/Movable/Auto)", type: "checkbox" },
  { name: "iceDispenser", label: "Ice Dispenser (Auto/Manual)", type: "checkbox" },
  { name: "waterDispenser", label: "Water Dispenser", type: "checkbox" },
  { name: "refrigeratorLight", label: "Refrigerator Light (LED/Bulb)" },
  { name: "freezerLight", label: "Freezer Light (LED/Bulb)" },
  { name: "transparentBaskets", label: "Transparent Baskets", type: "checkbox" },
  { name: "vegetableBox", label: "Vegetable Box / Crisper", type: "checkbox" },
  { name: "humidityControl", label: "Humidity Control (Moisture Balance)", type: "checkbox" },
  { name: "deodorizer", label: "Deodorizer / Freshness Technology", type: "checkbox" },
  { name: "antiBacterialGasket", label: "Anti-Bacterial Gasket", type: "checkbox" },
  { name: "coolpad", label: "Coolpad / Cool Pack", type: "checkbox" },
  { name: "stabilizerFreeOperation", label: "Stabilizer-Free Operation", type: "checkbox" },
  { name: "inverterTechnology", label: "Inverter / Digital Inverter", type: "checkbox" },
  { name: "powerCutBackup", label: "Power Cut/Backup Cooling", type: "checkbox" },
  { name: "soundLevel", label: "Sound Level (Noise in dB)" },
  { name: "color", label: "Color Options" },
  { name: "launchYear", label: "Launch Year" },
  { name: "warranty", label: "Warranty Period (Product/Compressor)" }
];



export const washingmachineSpecs = [
  { name: "productDimensions", label: "Product Dimensions (WxHxD mm)" },
  { name: "weight", label: "Weight (kg)" },
  { name: "washCapacity", label: "Wash Capacity (kg)" },
  { name: "spinTubCapacity", label: "Spin Tub Capacity (kg)" },
  { name: "maximumSpinSpeed", label: "Maximum Spin Speed (RPM)" },
  { name: "motorType", label: "Motor Type (Inverter, Direct Drive, Digital Inverter)" },
  { name: "energyRating", label: "Energy Rating (Star Rating)" },
  { name: "washPrograms", label: "Wash Programs (Types & Number)" },
  { name: "drumType", label: "Drum Type (Diamond, Stainless Steel, Plastic)" },
  { name: "pulsatorType", label: "Pulsator Type (Roller Jet, Dual Storm, PP Dual Wing)" },
  { name: "lintFilter", label: "Lint Filter", type: "checkbox" },
  { name: "autoRestart", label: "Auto Restart", type: "checkbox" },
  { name: "childLock", label: "Child Lock", type: "checkbox" },
  { name: "buzzer", label: "Buzzer", type: "checkbox" },
  { name: "waterFeed", label: "Water Feed Options (Hot/Cold/Both)" },
  { name: "steamFunction", label: "Steam Wash Function", type: "checkbox" },
  { name: "quickWash", label: "Quick Wash Program", type: "checkbox" },
  { name: "delayEnd", label: "Delay End Feature", type: "checkbox" },
  { name: "noiseLevelWash", label: "Noise Level During Wash (dB)" },
  { name: "noiseLevelSpin", label: "Noise Level During Spin (dB)" },
  { name: "inverterTechnology", label: "Inverter Technology", type: "checkbox" },
  { name: "smartControl", label: "Smart Control / Wi-Fi Enabled", type: "checkbox" },
  { name: "smartDiagnosis", label: "Smart Diagnosis", type: "checkbox" },
  { name: "voiceAssistantIntegration", label: "Voice Assistant Integration (Bixby, Google, Alexa)", type: "checkbox" },
  { name: "rollerJetPulsator", label: "Roller Jet Pulsator", type: "checkbox" },
  { name: "collarScrubber", label: "Collar Scrubber", type: "checkbox" },
  { name: "ratAwayFeature", label: "Rat Away Feature", type: "checkbox" },
  { name: "rustFreePlasticBase", label: "Rust Free Plastic Base", type: "checkbox" },
  { name: "waterFall", label: "Water Fall Feature", type: "checkbox" },
  { name: "unidirectionalWheel", label: "Unidirectional Wheel" },
  { name: "windJetDry", label: "Wind Jet Dry", type: "checkbox" },
  { name: "soak", label: "Soak Program", type: "checkbox" },
  { name: "normal", label: "Normal Program", type: "checkbox" },
  { name: "gentle", label: "Gentle Program", type: "checkbox" },
  { name: "strong", label: "Strong Program", type: "checkbox" },
  { name: "drainSelector", label: "Drain Selector", type: "checkbox" },
  { name: "soakTimer", label: "Soak Timer (minutes)" },
  { name: "spinTimer", label: "Spin Timer (minutes)" },
  { name: "washTimer", label: "Wash Timer (minutes)" },
  { name: "digitalDisplay", label: "Digital Display / LED Panel", type: "checkbox" },
  { name: "tubMaterial", label: "Tub Material (Stainless Steel, Plastic)" },
  { name: "fabricCareFeatures", label: "Fabric Care Features (6 Motion DD, TurboWash, Steam Allergen Care, etc.)" },
  { name: "noiseReducingFeatures", label: "Noise/Vibration Reducing Features (VRT, Direct Drive)" },
  { name: "powerSupply", label: "Power Supply (Voltage, Hz)" },
  { name: "warranty", label: "Warranty Period (Product, Motor)" },
  { name: "colorOptions", label: "Color Options" }
];



export const airconditionerSpecs = [
  { name: "hvacType", label: "HVAC Type" },
  { name: "coolingCapacityMax", label: "Cooling Capacity Max (W)" },
  {
    name: "coolingPowerConsumptionRatedMin",
    label: "Cooling Power Consumption Rated/Min (W)",
  },

  // Design
  { name: "colorBody", label: "Color (Body)" },
  { name: "colorDischarge", label: "Color (Discharge)" },
  { name: "display", label: "Display" },

  // General
  { name: "coolingCapacityRatedMin", label: "Cooling Capacity Rated/Min (W)" },
  { name: "indoorUnitDimension", label: "Indoor Unit Dimension WxHxD (mm)" },
  { name: "indoorUnitWeight", label: "Indoor Unit Weight (kg)" },
  { name: "outdoorUnitDimension", label: "Outdoor Unit Dimension WxHxD (mm)" },
  { name: "outdoorUnitWeight", label: "Outdoor Unit Weight (kg)" },
  { name: "ratedInputVoltage", label: "Rated Input Voltage (V, Hz)" },
  { name: "refrigerantType", label: "Refrigerant Type" },
  { name: "soundPower", label: "Sound Power (Cooling) SH/H/M/L/SL (dB(A))" },
  { name: "productTypeII", label: "Product Type II" },

  { name: "hymalayaCool", label: "Hymalaya Cool", type: "checkbox" },
  {
    name: "airflowDirectionControl",
    label: "Airflow Direction Control (Up & Down)",
  },
  { name: "fanSpeed", label: "Fan Speed" },
  { name: "sixInOneCooling", label: "6-in-1 Cooling", type: "checkbox" },
  { name: "dietMode", label: "Diet Mode", type: "checkbox" },

  { name: "dehumidification", label: "Dehumidification", type: "checkbox" },

  {
    name: "energySavingCooling",
    label: "Energy Saving (Cooling)",
    type: "checkbox",
  },

  { name: "autoRestart", label: "Auto Restart", type: "checkbox" },
  { name: "fanMode", label: "Fan Mode", type: "checkbox" },
  {
    name: "forcedSwitchOperation",
    label: "Forced Switch Operation",
    type: "checkbox",
  },
  { name: "lowNoise", label: "Low Noise", type: "checkbox" },
  {
    name: "onOffReservation",
    label: "On/Off Reservation (24Hr)",
    type: "checkbox",
  },
  { name: "remoteController", label: "Remote Controller", type: "checkbox" },
  {
    name: "stabilizerFreeOperation",
    label: "Stabilizer Free Operation",
    type: "checkbox",
  },
  {
    name: "tropicalNightComfortSleep",
    label: "Tropical Night Comfort Sleep",
    type: "checkbox",
  },

  { name: "launchingMonth", label: "Launching Month (YYYY-MM)" },
  { name: "productTypeModelName", label: "Product Type & Model Name" },

  { name: "outdoorUnitModelName", label: "Outdoor Unit Model Name" },
  { name: "seerRating", label: "SEER Rating" },
  { name: "eerRating", label: "EER Rating" },
  { name: "energyCertification", label: "Energy Certification" },
  { name: "tonnage", label: "Tonnage" },
  { name: "liquidLineConnectionSize", label: "Liquid Line Connection Size" },
  { name: "suctionLineConnectionSize", label: "Suction Line Connection Size" },
  { name: "compressorType", label: "Compressor Type" },
  { name: "soundLevel", label: "Sound Level (dB(A))" },
  { name: "variableSpeedCompressor", label: "Variable Speed Compressor", type: "checkbox" },
  { name: "smartGridReady", label: "Smart/Grid Ready", type: "checkbox" },
  { name: "connectedFunctionality", label: "Connected Functionality (Wi-Fi/App)", type: "checkbox" },
  { name: "designType", label: "Design Type" }
];


export const bluetoothSpeakerSpecs = [
  // General
  { name: "modelNumber", label: "Model Number" },
  { name: "modelName", label: "Model Name" },
  { name: "brand", label: "Brand" },
  { name: "type", label: "Type" },
  { name: "color", label: "Color" },
  { name: "configuration", label: "Configuration" },
  { name: "powerSource", label: "Power Source" },
  { name: "powerOutputRMS", label: "Power Output (RMS)" },
  { name: "frequencyResponse", label: "Frequency Response" },
  { name: "impedance", label: "Impedance" },
  { name: "wiredWireless", label: "Wired/Wireless" },
  { name: "bluetooth", label: "Bluetooth", type: "checkbox" },
  { name: "bluetoothVersion", label: "Bluetooth Version" },
  { name: "bluetoothRange", label: "Bluetooth Range" },
  { name: "memoryCardSlot", label: "Memory Card Slot", type: "checkbox" },
  { name: "memoryCardSupported", label: "Memory Card Supported" },
  { name: "builtInFMRadio", label: "Built-in FM Radio", type: "checkbox" },
  { name: "outdoorUsage", label: "Outdoor Usage", type: "checkbox" },
  { name: "waterproof", label: "Waterproof", type: "checkbox" },
  { name: "mountingType", label: "Mounting Type" },
  { name: "recommendedUses", label: "Recommended Uses" },
  { name: "compatibleDevices", label: "Compatible Devices" },
  { name: "subwoofer", label: "Subwoofer", type: "checkbox" },
  { name: "subwooferDiameter", label: "Subwoofer Diameter" },
  { name: "wooferDiameter", label: "Woofer Diameter" },
  { name: "tweeterDiameter", label: "Tweeter Diameter" },
  { name: "surroundSoundChannelConfiguration", label: "Surround Sound Channel Configuration" },
  { name: "driverSize", label: "Driver Size" },
  { name: "driverType", label: "Driver Type" },
  { name: "separation", label: "Separation" },
  { name: "audioCodec", label: "Audio Codec" },
  { name: "signalToNoiseRatio", label: "Signal-to-Noise Ratio" },
  { name: "distortion", label: "Distortion" },

  // Controls & Connectivity
  { name: "controls", label: "Controls" },
  { name: "remoteControlSupport", label: "Remote Control Support" },
  { name: "connectorType", label: "Connector Type" },
  { name: "usbPorts", label: "USB Ports" },
  { name: "headphoneJack", label: "Headphone Jack", type: "checkbox" },

  // Power & Battery
  { name: "batteryType", label: "Battery Type" },
  { name: "batteryCapacity", label: "Battery Capacity" },
  { name: "batteryLife", label: "Battery Life" },
  { name: "chargingTime", label: "Charging Time" },
  { name: "powerInput", label: "Power Input" },
  { name: "includesRechargeableBattery", label: "Includes Rechargeable Battery", type: "checkbox" },

  // Dimensions & Weight
  { name: "productDimensions", label: "Product Dimensions" },
  { name: "width", label: "Width" },
  { name: "height", label: "Height" },
  { name: "depth", label: "Depth" },
  { name: "subwooferWidth", label: "Subwoofer Width" },
  { name: "subwooferWeight", label: "Subwoofer Weight" },
  { name: "productWeight", label: "Product Weight" },

  // Design & Build
  { name: "chassisMaterial", label: "Chassis Material" },
  { name: "technologyUsed", label: "Technology Used" },
  { name: "display", label: "Display" },
  { name: "isWaterproof", label: "Is Waterproof", type: "checkbox" },

  // Warranty
  { name: "warrantyServiceType", label: "Warranty Service Type" },
  { name: "warrantySummary", label: "Warranty Summary" },
  { name: "coveredInWarranty", label: "Covered in Warranty" },
  { name: "notCoveredInWarranty", label: "Not Covered in Warranty" },
  { name: "warrantyType", label: "Warranty Type" },

  // Additional Features
  { name: "otherSystemRequirements", label: "Other System Requirements" },
  { name: "otherFeatures", label: "Other Features" }
];

export const sewingMachineSpecs = [
  { name: "inTheBox", label: "In The Box" },
  { name: "modelName", label: "Model Name" },
  { name: "color", label: "Color" },
  { name: "type", label: "Type" },
  { name: "shade", label: "Shade" },
  { name: "numberOfStitches", label: "Number of Stitches" },
  { name: "numberOfButtonholeStyles", label: "Number of Buttonhole Styles" },
  { name: "sewingSpeed", label: "Sewing Speed" },
  { name: "lcdScreenDisplay", label: "LCD Screen Display" },
  { name: "material", label: "Material" },
  { name: "shape", label: "Shape" },
  { name: "bobbinWinder", label: "Bobbin Winder" },
  { name: "touchscreen", label: "Touchscreen" },
  { name: "startStopButton", label: "Start/Stop Button" },
  { name: "stitchOutTimeIndicator", label: "Stitch-out Time Indicator" },
  { name: "ledNeedleLight", label: "LED Needle Light" },
  { name: "automaticThreadCutter", label: "Automatic Thread Cutter" },
  { name: "width", label: "Width" },
  { name: "height", label: "Height" },
  { name: "depth", label: "Depth" },
  { name: "weight", label: "Weight" },
  { name: "warrantySummary", label: "Warranty Summary" },
  { name: "coveredInWarranty", label: "Covered in Warranty" },
  { name: "notCoveredInWarranty", label: "Not Covered in Warranty" },
  { name: "warrantyServiceType", label: "Warranty Service Type" }
];


export const fanSpecs = [
  // General Information
  { name: "modelName", label: "Model Name" },
  { name: "color", label: "Color" },
  { name: "mountingType", label: "Mounting Type" },
  { name: "fanDesign", label: "Fan Design" },
  { name: "powerSource", label: "Power Source" },
  { name: "roomType", label: "Suitable Room Type" },
  { name: "specialFeatures", label: "Special Features" },
  { name: "recommendedUses", label: "Recommended Uses" },
  { name: "numberOfBlades", label: "Number of Blades" },
  { name: "bladeSweep", label: "Blade Sweep (Diameter)" },
  { name: "bladeMaterial", label: "Blade Material" },
  { name: "switchType", label: "Switch Type" },
  { name: "controlMethod", label: "Control Method" },
  { name: "powerLevels", label: "Number of Power Levels" },
  { name: "specificationMet", label: "Standards Met (e.g., BEE Rated)" },

  // Performance
  { name: "airFlow", label: "Air Flow Capacity" },
  { name: "airThrowDistance", label: "Air Throw Distance" },
  { name: "airDeflection", label: "Air Deflection Type" },
  { name: "speed (RPM)", label: "Speed (RPM)" },

  // Coverage & Efficiency
  { name: "coverageArea", label: "Cooling Coverage Area" },
  { name: "energyEfficiencyRating", label: "Energy Efficiency Rating" },

  // Dimensions & Weight
  { name: "productDimensions", label: "Product Dimensions (LxWxH)" },
  { name: "width", label: "Width" },
  { name: "height", label: "Height" },
  { name: "depth", label: "Depth" },
  { name: "weight", label: "Weight" },

  // Body & Design
  { name: "bodyMaterial", label: "Body Material" },
  { name: "iceChamber", label: "Ice Chamber (if any)" },
  { name: "castorWheels", label: "Castor Wheels" },
  { name: "autoLouver", label: "Auto Louver Movement" },
  { name: "oscillatingFunction", label: "Oscillating Function" },

  // Convenience Features
  { name: "remoteSupport", label: "Remote Support" },
  { name: "waterLevelIndicator", label: "Water Level Indicator" },
  { name: "emptyTankAlarm", label: "Empty Tank Alarm" },
  { name: "overflowIndicator", label: "Overflow Indicator" },
  { name: "inverterCompatible", label: "Inverter Compatible" },

  // Power & Electrical
  { name: "voltage", label: "Voltage" },
  { name: "powerRequirement", label: "Power Requirement" },
  { name: "energyConsumption", label: "Power Consumption (W)" },

  // Warranty
  { name: "warrantySummary", label: "Warranty Summary" },
  { name: "coveredInWarranty", label: "Covered in Warranty" },
  { name: "notCoveredInWarranty", label: "Not Covered in Warranty" },
  { name: "warrantyServiceType", label: "Warranty Service Type" },
  { name: "domesticWarrantyPeriod", label: "Domestic Warranty Period" },

  // Packaging & Quantity
  { name: "includedComponents", label: "Included Components" },
  { name: "netQuantity", label: "Net Quantity" },

  // Manufacturer/Origin Info
  { name: "countryOfOrigin", label: "Country of Origin" },
  { name: "manufactureYear", label: "Manufacture Year" },
  { name: "asinOrSKU", label: "ASIN/SKU" },
];


export const coolerSpecs = [
  // General
  { name: "brand", label: "Brand" },
  { name: "modelName", label: "Model Name" },
  { name: "color", label: "Color" },
  { name: "type", label: "Type" },
  { name: "mountingType", label: "Mounting Type" },
  { name: "specialFeature", label: "Special Feature" },
  { name: "recommendedUses", label: "Recommended Uses For Product" },
  { name: "coolingMedia", label: "Cooling Media" },
  { name: "blowerFan", label: "Blower/Fan" },
  { name: "blowerFanMaterial", label: "Blower/Fan Material" },
  { name: "numberOfFanBlades", label: "Number of Fan Blades" },
  { name: "coolingAndHeating", label: "Cooling and Heating" },
  { name: "remoteSupport", label: "Remote Support" },
  { name: "genericName", label: "Generic Name" },

  // Performance Features
  { name: "airFlowCapacity", label: "Air Flow Capacity" },
  { name: "coolingCoverageArea", label: "Cooling Coverage Area" },
  { name: "speedControl", label: "Speed Control" },
  { name: "numberOfSpeeds", label: "Number of Speeds" },
  { name: "operatingMode", label: "Operating Mode" },
  { name: "airThrowDistance", label: "Air Throw Distance" },
  { name: "airDeflection", label: "Air Deflection" },
  { name: "technologyUsed", label: "Technology Used" },
  { name: "otherPerformanceFeatures", label: "Other Performance Features" },

  // Capacity
  { name: "waterTankCapacity", label: "Water Tank Capacity" },
  { name: "reservoirCapacity", label: "Reservoir Capacity" },

  // Body & Design Features
  { name: "bodyMaterial", label: "Body Material" },
  { name: "iceChamber", label: "Ice Chamber" },
  { name: "castorWheels", label: "Castor Wheels" },
  { name: "numberOfCastorWheels", label: "Number of Castor Wheels" },
  { name: "autoLouverMovement", label: "Auto Louver Movement" },
  { name: "oscillatingFunction", label: "Oscillating Function" },

  // Convenience Features
  { name: "emptyTankAlarm", label: "Empty Tank Alarm" },
  { name: "waterLevelIndicator", label: "Water Level Indicator" },
  { name: "dustFilter", label: "Dust Filter" },
  { name: "overflowIndicator", label: "Overflow Indicator" },
  { name: "inverterCompatible", label: "Inverter Compatible" },

  // Dimensions
  { name: "productDimensions", label: "Product Dimensions (LxWxH)" },
  { name: "width", label: "Width" },
  { name: "height", label: "Height" },
  { name: "depth", label: "Depth" },
  { name: "blowerFanDiameter", label: "Blower/Fan Diameter" },

  // Power Features
  { name: "voltage", label: "Voltage" },
  { name: "powerRequirement", label: "Power Requirement" },
  { name: "otherPowerFeatures", label: "Other Power Features" },

  // Weight
  { name: "weight", label: "Weight" },

  // Included Components
  { name: "includedComponents", label: "Included Components" },

  // Warranty
  { name: "warrantySummary", label: "Warranty Summary" },
  { name: "coveredInWarranty", label: "Covered in Warranty" },
  { name: "notCoveredInWarranty", label: "Not Covered in Warranty" },
  { name: "warrantyServiceType", label: "Warranty Service Type" },
  { name: "domesticWarranty", label: "Domestic Warranty" },

  // Manufacturer Details
  { name: "manufacturer", label: "Manufacturer" },
  { name: "packer", label: "Packer" },
  { name: "manufactureYear", label: "Manufacture Year" },
  { name: "countryOfOrigin", label: "Country of Origin" },
  { name: "itemModelNumber", label: "Item Model Number" },
  { name: "asin", label: "ASIN" },
  { name: "netQuantity", label: "Net Quantity" }
];

export const ironSpecs = [
  { name: "type", label: "Type" },
  { name: "soleplateMaterial", label: "Soleplate Material" },
  { name: "powerConsumptionWatts", label: "Power Consumption (Watts)" },
  { name: "temperatureControl", label: "Temperature Control" },
  { name: "steamBurst", label: "Steam Burst" },
  { name: "sprayFunction", label: "Spray Function" },
  { name: "waterTankCapacityMl", label: "Water Tank Capacity (ml)" },
  { name: "cordLengthMeters", label: "Cord Length (Meters)" },
  { name: "autoShutOff", label: "Auto Shut-Off" },
  { name: "indicatorLight", label: "Indicator Light" },
  { name: "antiDrip", label: "Anti-Drip" },
  { name: "antiCalc", label: "Anti-Calc" },
  { name: "color", label: "Color" },
  { name: "productWeightKg", label: "Product Weight (Kg)" },
  { name: "dimensions", label: "Dimensions (HxWxD)" },
  { name: "warranty", label: "Warranty" }
];

export const mixerJuicerSpecs = [
  // General
  { name: "modelName", label: "Model Name" },
  { name: "color", label: "Color" },
  { name: "type", label: "Type" },
  { name: "specialFeatures", label: "Special Features" },
  { name: "recommendedUses", label: "Recommended Uses" },
  { name: "productCare", label: "Product Care Instructions" },
  { name: "finishType", label: "Finish Type" },

  // Capacity
  { name: "capacity", label: "Overall Capacity" },
  { name: "grindingJarCapacity", label: "Grinding Jar Capacity" },
  { name: "liquidizingJarCapacity", label: "Liquidizing Jar Capacity" },
  { name: "chutneyJarCapacity", label: "Chutney Jar Capacity" },

  // Performance
  { name: "powerRequired", label: "Power Required" },
  { name: "powerConsumption", label: "Power Consumption" },
  { name: "revolutions", label: "Revolutions" },
  { name: "numberOfSpeeds", label: "Number of Speeds" },
  { name: "bladeMaterial", label: "Blade Material" },
  { name: "lockingSystem", label: "Locking System" },
  { name: "nonSlipFeet", label: "Non-slip Feet" },
  { name: "dryGrinding", label: "Dry Grinding" },
  { name: "blending", label: "Blending" },
  { name: "chutneyGrinding", label: "Chutney Grinding" },

  // Power & Controls
  { name: "voltage", label: "Voltage" },
  { name: "controllerType", label: "Controller Type" },
  { name: "powerSource", label: "Power Source" },

  // Dimensions & Weight
  { name: "productDimensions", label: "Product Dimensions (LxWxH)" },
  { name: "depth", label: "Depth" },
  { name: "width", label: "Width" },
  { name: "height", label: "Height" },
  { name: "weight", label: "Weight" },

  // Warranty
  { name: "warrantySummary", label: "Warranty Summary" },
  { name: "warrantyServiceType", label: "Warranty Service Type" },
  { name: "coveredInWarranty", label: "Covered in Warranty" },
  { name: "notCoveredInWarranty", label: "Not Covered in Warranty" },
  { name: "domesticWarranty", label: "Domestic Warranty" },

  // Included Components
  { name: "includedComponents", label: "Included Components" },
  
  // Other
  { name: "genericName", label: "Generic Name" },
  { name: "netQuantity", label: "Net Quantity" },
  { name: "asin", label: "ASIN" }
];

export const microwaveSpecs = [
  // General
  { name: "inTheBox", label: "In The Box" },
  { name: "brand", label: "Brand" },
  { name: "modelName", label: "Model Name" },
  { name: "type", label: "Type" },
  { name: "capacity", label: "Capacity" },
  { name: "color", label: "Color" },
  { name: "shade", label: "Shade" },
  { name: "controlType", label: "Control Type" },
  { name: "mountType", label: "Mount Type" },
  { name: "frequency", label: "Frequency" },
  { name: "displayType", label: "Display Type" },
  { name: "manufacturingYear", label: "Manufacturing Year" },
  { name: "rotisserie", label: "Rotisserie" },
  { name: "launchYear", label: "Launch Year" },
  { name: "certification", label: "Certification" },
  { name: "technologyUsed", label: "Technology Used" },
  { name: "remote", label: "Remote" },
  { name: "otherFeatures", label: "Other Features" },
  { name: "genericName", label: "Generic Name" },
  { name: "netQuantity", label: "Net Quantity" },
  { name: "asin", label: "ASIN" },

  // Body & Design
  { name: "cavityMaterial", label: "Cavity Material" },
  { name: "doorType", label: "Door Type" },
  { name: "doorOpeningMechanism", label: "Door Opening Mechanism" },
  { name: "turntable", label: "Turntable" },
  { name: "turntableMaterial", label: "Turntable Material" },
  { name: "interiorLight", label: "Interior Light" },

  // Cooking Features
  { name: "autoCookMenu", label: "Auto Cook Menu" },
  { name: "autoCookMenuAvailable", label: "Auto Cook Menu Available" },
  { name: "cookingCompletionIndicator", label: "Cooking Completion Indicator" },
  { name: "cookingModes", label: "Cooking Modes" },
  { name: "otherCookingFeatures", label: "Other Cooking Features" },

  // Performance Features
  { name: "preheat", label: "Preheat" },
  { name: "timer", label: "Timer" },
  { name: "defrost", label: "Defrost" },
  { name: "powerLevels", label: "Power Levels" },
  { name: "steamCook", label: "Steam Cook" },
  { name: "reheat", label: "Reheat" },
  { name: "temperatureRange", label: "Temperature Range" },
  { name: "temperatureRangeLevels", label: "Temperature Range Levels" },
  { name: "steamClean", label: "Steam Clean" },
  { name: "otherPerformanceFeatures", label: "Other Performance Features" },

  // Power Features
  { name: "powerOutput", label: "Power Output" },
  { name: "powerRequirement", label: "Power Requirement" },
  { name: "powerConsumptionGrill", label: "Power Consumption - Grill" },
  { name: "powerConsumptionConvection", label: "Power Consumption - Convection" },
  { name: "powerConsumptionMicrowave", label: "Power Consumption - Microwave" },
  { name: "voltage", label: "Voltage" },
  { name: "wattage", label: "Wattage" },
  { name: "energyConsumption", label: "Energy Consumption" },
  { name: "annualEnergyConsumption", label: "Annual Energy Consumption" },

  // Dimensions & Weight
  { name: "productDimensions", label: "Product Dimensions (LxWxH)" },
  { name: "width", label: "Width" },
  { name: "height", label: "Height" },
  { name: "depth", label: "Depth" },
  { name: "turntableDiameter", label: "Turntable Diameter" },
  { name: "cavityWidth", label: "Cavity Width" },
  { name: "cavityHeight", label: "Cavity Height" },
  { name: "cavityDepth", label: "Cavity Depth" },
  { name: "weight", label: "Weight" },
  { name: "otherDimensions", label: "Other Dimensions" },

  // Convenience Features
  { name: "alarm", label: "Alarm" },
  { name: "memoryFunction", label: "Memory Function" },
  { name: "deodorizer", label: "Deodorizer" },
  { name: "childLock", label: "Child Lock" },
  { name: "overheatProtection", label: "Overheat Protection" },
  { name: "greaseFilter", label: "Grease Filter" },
  { name: "inDoorControls", label: "In Door Controls" },
  { name: "racksTraysAvailable", label: "Racks & Trays Available" },

  // Warranty
  { name: "warrantySummary", label: "Warranty Summary" },
  { name: "coveredInWarranty", label: "Covered in Warranty" },
  { name: "notCoveredInWarranty", label: "Not Covered in Warranty" },
  { name: "domesticWarranty", label: "Domestic Warranty" },
  { name: "warrantyServiceType", label: "Warranty Service Type" },

  // Other (Amazon Specific)
  { name: "installationType", label: "Installation Type" },
  { name: "partNumber", label: "Part Number" },
  { name: "specialFeatures", label: "Special Features" },
  { name: "ovenCookingMode", label: "Oven Cooking Mode" },
  { name: "burnerType", label: "Burner Type" },
  { name: "fuelType", label: "Fuel Type" },
  { name: "doorOrientation", label: "Door Orientation" },
  { name: "material", label: "Material" },
  { name: "includedComponents", label: "Included Components" },
  { name: "batteriesIncluded", label: "Batteries Included" },
  { name: "batteriesRequired", label: "Batteries Required" },
  { name: "manufacturer", label: "Manufacturer" },
  { name: "countryOfOrigin", label: "Country of Origin" },
  { name: "packer", label: "Packer" },
  { name: "importer", label: "Importer" },
  { name: "customerReviews", label: "Customer Reviews" },
  { name: "bestSellersRank", label: "Best Sellers Rank" },
  { name: "dateFirstAvailable", label: "Date First Available" }
];

export const inductionSpecs = [
  // In The Box
  { name: "salesPackage", label: "Sales Package" },
  { name: "includedComponents", label: "Included Components" },
  { name: "genericName", label: "Generic Name" },
  { name: "netQuantity", label: "Net Quantity" },

  // General
  { name: "brand", label: "Brand" },
  { name: "modelName", label: "Model Name" },
  { name: "model", label: "Model" },
  { name: "itemModelNumber", label: "Item Model Number" },
  { name: "type", label: "Type" },
  { name: "color", label: "Color" },
  { name: "series", label: "Series" },
  { name: "worktopMaterial", label: "Worktop Material" },
  { name: "keepWarmFunction", label: "Keep Warm Function" },

  // General Features
  { name: "bodyMaterial", label: "Body Material" },
  { name: "control", label: "Control" },
  { name: "presetCookingMenus", label: "Preset Cooking Menus" },
  { name: "timerWithUserPreset", label: "Timer With User Pre-Set" },
  { name: "display", label: "Display" },
  { name: "digitalDisplay", label: "Digital Display" },
  { name: "timer", label: "Timer" },
  { name: "fastHeating", label: "Fast Heating" },
  { name: "elementsOnCooktop", label: "Elements on Cooktop" },
  { name: "powerIndicator", label: "Power Indicator" },

  // Additional Features
  { name: "otherFeatures", label: "Other Features" },
  { name: "otherBodyDesignFeatures", label: "Other Body & Design Features" },

  // Power Features
  { name: "powerConsumption", label: "Power Consumption" },
  { name: "powerInput", label: "Power Input" },
  { name: "powerSource", label: "Power Source" },

  // Dimensions
  { name: "height", label: "Height" },
  { name: "width", label: "Width" },
  { name: "depth", label: "Depth" },
  { name: "weight", label: "Weight" },
  { name: "itemDimensions", label: "Item Dimensions (LxWxH)" },

  // Warranty
  { name: "serviceType", label: "Service Type" },
  { name: "warrantyType", label: "Warranty Type" },
  { name: "warrantySummary", label: "Warranty Summary" },
  { name: "coveredInWarranty", label: "Covered In Warranty" },
  { name: "notCoveredInWarranty", label: "Not Covered In Warranty" },

  // Manufacturer & Other Info
  { name: "manufacturer", label: "Manufacturer" },
  { name: "countryOfOrigin", label: "Country of Origin" },
  { name: "packer", label: "Packer" },
  { name: "importer", label: "Importer" },
  { name: "asin", label: "ASIN" },
  { name: "bestSellersRank", label: "Best Sellers Rank" }
];

export const waterHeaterSpecs = [
  // In The Box
  { name: "salesPackage", label: "Sales Package" },
  { name: "includedComponents", label: "Included Components" },
  { name: "genericName", label: "Generic Name" },
  { name: "netQuantity", label: "Net Quantity" },

  // General
  { name: "brand", label: "Brand" },
  { name: "modelName", label: "Model Name" },
  { name: "itemModelNumber", label: "Item Model Number" },
  { name: "capacity", label: "Capacity" },
  { name: "color", label: "Color" },
  { name: "type", label: "Type" },
  { name: "mountType", label: "Mount Type" },
  { name: "starRating", label: "Star Rating" },
  { name: "style", label: "Style" },
  { name: "isElectric", label: "Is Electric" },

  // Performance Features
  { name: "ratedPressure", label: "Rated Pressure" },
  { name: "maximumOperatingPressure", label: "Maximum Operating Pressure" },
  { name: "heatOutput", label: "Heat Output" },
  { name: "specialFeatures", label: "Special Features" },

  // Power Features
  { name: "powerConsumption", label: "Power Consumption" },
  { name: "wattage", label: "Wattage" },

  // Dimensions
  { name: "width", label: "Width" },
  { name: "height", label: "Height" },
  { name: "depth", label: "Depth" },
  { name: "weight", label: "Weight" },
  { name: "productDimensions", label: "Product Dimensions" },
  { name: "itemWeight", label: "Item Weight" },

  // Warranty
  { name: "warrantySummary", label: "Warranty Summary" },
  { name: "coveredInWarranty", label: "Covered in Warranty" },
  { name: "notCoveredInWarranty", label: "Not Covered in Warranty" },
  { name: "warrantyServiceType", label: "Warranty Service Type" },

  // Manufacturer & Other Info
  { name: "manufacturer", label: "Manufacturer" },
  { name: "countryOfOrigin", label: "Country of Origin" },
  { name: "packer", label: "Packer" },
  { name: "importer", label: "Importer" },
  { name: "asin", label: "ASIN" },
  { name: "bestSellersRank", label: "Best Sellers Rank" }
];
