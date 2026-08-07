/* Bharatiya Krishak Samaj, West Bengal
   Booth Volunteer Enrollment — one Booth Prabhari per polling booth.

   The booth uniqueness rule is enforced in the database, not here. This file
   only asks nicely first, so a volunteer learns the booth is taken before
   filling in a long form rather than after. */

const SUPABASE_URL = 'https://lhnorkjfldywnrqqunqn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxobm9ya2pmbGR5d25ycXF1bnFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4MzgxMjcsImV4cCI6MjA4NzQxNDEyN30.y90MFaq7qJ4YxuF-6HsY0WUZ9zSDJYwfl6F5r-JJrxI';
const SUPPORT_LIMIT = 4;

const translations = {
  en: {
    brand:"Bharatiya Krishak Samaj", brandSub:"West Bengal",
    navVision:"Vision", navLeadership:"Leadership", navDistrict:"District leadership", navVolunteer:"Booth volunteers",
    boothEyebrow:"Booth Volunteer Network · West Bengal",
    boothTitle:"One farmer volunteer from every booth.",
    boothLead:"Bharatiya Krishak Samaj, West Bengal is being built from the ground up — booth by booth. Each polling booth gets one Booth Prabhari: a farmer or farm-family member who knows that village, carries BKS work there, and speaks for its cultivators. Find your booth, check whether it is still open, and claim it.",
    boothMeta1Label:"The unit", boothMeta1:"One booth, one Prabhari",
    boothMeta2Label:"Who can enroll", boothMeta2:"Any farmer, 18 and above",
    boothMeta3Label:"What it costs", boothMeta3:"Nothing. No fee, ever.",
    boothCta:"Claim my booth", boothCta2:"How the booth system works",
    coverageEyebrow:"Live coverage",
    coverageBoothsLabel:"booths claimed", coverageDistrictsLabel:"districts active", coverageSupportLabel:"support volunteers",
    coverageNote:"Counts update as volunteers enroll. West Bengal has 294 assembly constituencies and roughly 80,000 polling booths — this is a long walk, and it starts with your village.",
    howEyebrow:"How it works",
    howTitle:"Why the booth, and not the district, is the real unit.",
    howText:"A district head cannot know ten thousand farmers. A booth volunteer knows three hundred, by name. The booth is the smallest unit where farmer problems are actually visible — which fields flooded, which family did not get their seed, which cold store cheated whom. BKS West Bengal builds upward from there.",
    ladder1:"Booth Prabhari", ladder1Text:"One per polling booth. Knows the farming families of that booth area, registers their issues, carries BKS training and information to them, and represents them upward.",
    ladder2:"Booth Sahayak", ladder2Text:"Up to four support volunteers per booth — youth, women farmers, agri-graduates. If your booth is already claimed, this is how you still serve it.",
    ladder3:"Gram Panchayat and Block", ladder3Text:"Booth Prabharis of an area form the panchayat and block committees. Nobody is appointed to a block seat without booth-level work behind them.",
    ladder4:"District and State", ladder4Text:"District leadership is chosen from those who built booth strength. The state committee under Mahacharya Sourabh J. Sarkar sits on this foundation, not above it.",
    dutyEyebrow:"What a Booth Prabhari actually does", dutyTitle:"Four hours a week. Real work, not a title.",
    duty1:"Build and keep a living list of farming families in your booth area — what they grow, how much land, what they struggle with.",
    duty2:"Carry BKS training on natural farming, seed, soil and input costs into your village, in Bengali.",
    duty3:"Report farmer problems upward — crop loss, input price, mandi rates, irrigation, compensation delays — so the state unit can raise them with weight.",
    duty4:"Bring at least ten farming families into BKS membership in your first ninety days.",
    duty5:"Help women farmers and rural youth in your booth reach BKS training and enterprise programmes.",
    claimEyebrow:"Booth enrollment", claimTitle:"Find your booth. Check it. Claim it.",
    claimText:"Your booth is identified by two numbers: your assembly constituency number (1 to 294) and your booth part number. Both are printed on your voter slip and on the EPIC roll. If you do not know them, ask at your gram panchayat office or your nearest BKS worker — and enroll anyway, we will help you fix the numbers.",
    guideEyebrow:"Booth enrollment guide",
    guideTitle:"Step one: tell me which booth you belong to.",
    guidePrompt:"Enter your district, your assembly constituency number and your booth number, then press check. I will tell you immediately whether that booth is still open.",
    guideCheck1:"Your voter slip carries both numbers",
    guideCheck2:"One Prabhari per booth — first verified claim holds it",
    guideCheck3:"If taken, you can still join as Sahayak",
    guideCheck4:"A BKS worker will call you to verify",
    finderTitle:"Step 1 · Locate your booth",
    fieldDistrict:"District", selectDistrict:"Select district",
    fieldAc:"Assembly constituency", fieldBoothNo:"Booth / part number", checkBooth:"Check this booth",
    boothNotListed:"My booth isn't listed",
    formTitle:"Step 2 · Your details",
    fieldRole:"Role at this booth",
    rolePrabhari:"Booth Prabhari", rolePrabhariNote:"Booth in-charge · one per booth",
    roleSahayak:"Booth Sahayak", roleSahayakNote:"Support volunteer · up to four per booth",
    fieldName:"Full name", fieldPhone:"Mobile number", fieldWhatsapp:"WhatsApp (if different)", fieldEmail:"Email (optional)",
    fieldGender:"Gender", fieldAge:"Age group",
    optSelect:"Select", optFemale:"Female", optMale:"Male", optOther:"Other", optUndisclosed:"Prefer not to say",
    subheadPlace:"Where you live",
    fieldBlock:"Block / Municipality", fieldGp:"Gram Panchayat / Ward", fieldVillage:"Village / Para",
    fieldBoothName:"Booth building (school etc.)", fieldYears:"Years living in this village", fieldLanguage:"Preferred language",
    subheadFarm:"Your farming background",
    fieldOccupation:"Main occupation", fieldLand:"Land holding",
    optLandless:"Landless / farm worker", optSharecropper:"Bargadar / sharecropper", optUnder1:"Under 1 acre",
    opt13:"1 to 3 acres", opt310:"3 to 10 acres", opt10p:"More than 10 acres",
    fieldCrops:"Main crops or farm activity", fieldGroups:"Farmer groups you belong to (FPO, SHG, co-operative, samiti)",
    subheadCommit:"Your commitment",
    fieldHours:"Time you can give each week",
    optHours1:"Under 2 hours", optHours2:"2 to 4 hours", optHours3:"4 to 8 hours", optHours4:"More than 8 hours",
    fieldReferred:"Who told you about BKS (optional)",
    fieldSmartphone:"I have a smartphone with WhatsApp", fieldTravel:"I can travel to block-level BKS meetings",
    fieldMotivation:"Why do you want to serve the farmers of your booth?",
    consentContact:"BKS West Bengal may call or message me on this number about booth work, training and verification.",
    consentData:"My details may be kept by BKS West Bengal for organisational records. My phone number and address will not be shown publicly.",
    submitBooth:"Claim this booth", downloadBooth:"Download my form", changeBooth:"Choose a different booth",
    boothFormStatus:"A BKS worker from your district will call to verify before your booth is confirmed.",
    successEyebrow:"Booth claimed", successHeading:"Your booth is registered.",
    successBody:"Keep this claim code. A BKS West Bengal worker from your district will call you on the number you gave, verify who you are, and then your booth is confirmed. Until that call, your claim holds the booth but is not yet verified.",
    downloadReceipt:"Download my receipt", enrollAnother:"Enroll another booth",
    boothQuote:"“A village is not organised from Kolkata. It is organised by one person in that village who decided to stand up for the farmers around him.”",
    footerBrand:"Bharatiya Krishak Samaj, West Bengal",
    footerText:"A vision platform for farmer dignity, self-reliant agriculture and natural prosperity.",
    phAcNo:"No.", phAcName:"Constituency name (if known)", phPhone:"10-digit mobile",
    phOccupation:"Farmer, sharecropper, agri-input dealer, teacher, student…",
    phCrops:"Aman paddy, potato, jute, vegetables, fish, dairy…",
    rt:{
      needDistrict:"Please select your district first.",
      needAc:"Enter your assembly constituency number, between 1 and 294.",
      needBooth:"Enter your booth number.",
      checking:"Checking this booth…",
      available:"Booth {booth} in constituency {ac} is open. You can claim it as Booth Prabhari.",
      takenBy:"Booth {booth} in constituency {ac} already has a Booth Prabhari — {name}. You can still enroll as a Booth Sahayak, or choose the booth where you actually vote.",
      takenFull:"Booth {booth} in constituency {ac} is fully staffed: it has a Prabhari and {count} support volunteers. Please choose another booth, or contact your district team.",
      supportLeft:"{left} support volunteer slots are still open at this booth.",
      offlineCheck:"Live booth checking is not switched on yet, so we cannot confirm availability right now. Fill the form and the BKS team will resolve any clash during verification.",
      guideOpen:"This booth is open. Fill in your details and claim it.",
      guideTaken:"This booth already has a Prabhari. Enroll as a Sahayak, or go back and pick your own booth.",
      submitting:"Submitting your booth enrollment…",
      successToast:"Booth claimed. Keep your claim code safe.",
      errBoothTaken:"Someone claimed this booth a moment before you. Reload and enroll as a Booth Sahayak, or pick your own booth.",
      errPhone:"That mobile number does not look like a 10-digit Indian mobile number.",
      errPhoneUsed:"This mobile number is already enrolled at a booth. One volunteer, one booth. If this is a mistake, contact your district team.",
      errSupportFull:"All support volunteer slots at this booth are taken.",
      errName:"Please enter your full name.",
      errConsent:"Please accept both consent statements before submitting.",
      errInvalid:"Something in the form was not accepted. Please check your entries.",
      errOffline:"The database is not reachable right now, so your form has been downloaded as a file. Please send it to your BKS district team on WhatsApp.",
      claimLabel:"Your claim code",
      chipPrabhari:"Booth Prabhari · AC {ac} · Booth {booth} · {district}",
      chipSahayak:"Booth Sahayak · AC {ac} · Booth {booth} · {district}"
    }
  },

  hi: {
    brand:"भारतीय कृषक समाज", brandSub:"पश्चिम बंगाल",
    navVision:"दृष्टि", navLeadership:"नेतृत्व", navDistrict:"जिला नेतृत्व", navVolunteer:"बूथ स्वयंसेवक",
    boothEyebrow:"बूथ स्वयंसेवक नेटवर्क · पश्चिम बंगाल",
    boothTitle:"हर बूथ से एक किसान स्वयंसेवक।",
    boothLead:"भारतीय कृषक समाज, पश्चिम बंगाल को नीचे से ऊपर की ओर खड़ा किया जा रहा है — बूथ दर बूथ। हर मतदान बूथ पर एक बूथ प्रभारी होगा: एक किसान या कृषक परिवार का सदस्य, जो उस गाँव को जानता है, वहाँ BKS का काम पहुँचाता है और वहाँ के किसानों की आवाज़ बनता है। अपना बूथ खोजिए, देखिए कि वह खाली है या नहीं, और उसे अपने नाम कीजिए।",
    boothMeta1Label:"इकाई", boothMeta1:"एक बूथ, एक प्रभारी",
    boothMeta2Label:"कौन जुड़ सकता है", boothMeta2:"18 वर्ष से ऊपर हर किसान",
    boothMeta3Label:"शुल्क", boothMeta3:"कोई नहीं। कभी नहीं।",
    boothCta:"मेरा बूथ लें", boothCta2:"बूथ व्यवस्था कैसे काम करती है",
    coverageEyebrow:"वर्तमान स्थिति",
    coverageBoothsLabel:"बूथ लिए गए", coverageDistrictsLabel:"सक्रिय जिले", coverageSupportLabel:"सहायक स्वयंसेवक",
    coverageNote:"जैसे-जैसे स्वयंसेवक जुड़ते हैं, संख्या बढ़ती है। पश्चिम बंगाल में 294 विधानसभा क्षेत्र और लगभग 80,000 मतदान बूथ हैं — यह लंबा रास्ता है, और यह आपके गाँव से शुरू होता है।",
    howEyebrow:"कार्यप्रणाली",
    howTitle:"असली इकाई जिला नहीं, बूथ है।",
    howText:"कोई जिला अध्यक्ष दस हजार किसानों को नहीं जान सकता। एक बूथ स्वयंसेवक तीन सौ किसानों को नाम से जानता है। बूथ वही सबसे छोटी इकाई है जहाँ किसान की समस्या सचमुच दिखाई देती है — किसका खेत डूबा, किस परिवार को बीज नहीं मिला, किस कोल्ड स्टोर ने किसे ठगा। BKS पश्चिम बंगाल वहीं से ऊपर की ओर बनता है।",
    ladder1:"बूथ प्रभारी", ladder1Text:"प्रत्येक मतदान बूथ पर एक। अपने बूथ क्षेत्र के कृषक परिवारों को जानता है, उनकी समस्याएँ दर्ज करता है, BKS का प्रशिक्षण और जानकारी वहाँ पहुँचाता है और ऊपर उनका प्रतिनिधित्व करता है।",
    ladder2:"बूथ सहायक", ladder2Text:"प्रति बूथ अधिकतम चार सहायक स्वयंसेवक — युवा, महिला किसान, कृषि स्नातक। यदि आपका बूथ पहले ही लिया जा चुका है, तो इस रूप में आप उसकी सेवा कर सकते हैं।",
    ladder3:"ग्राम पंचायत और ब्लॉक", ladder3Text:"किसी क्षेत्र के बूथ प्रभारी मिलकर पंचायत और ब्लॉक समितियाँ बनाते हैं। बूथ स्तर के काम के बिना किसी को ब्लॉक पद नहीं मिलेगा।",
    ladder4:"जिला और प्रदेश", ladder4Text:"जिला नेतृत्व उन्हीं में से चुना जाएगा जिन्होंने बूथ की ताकत बनाई। महाचार्य सौरभ जे. सरकार के नेतृत्व में प्रदेश समिति इसी नींव पर टिकी है, उससे ऊपर नहीं।",
    dutyEyebrow:"बूथ प्रभारी वास्तव में क्या करता है", dutyTitle:"सप्ताह में चार घंटे। पद नहीं, काम।",
    duty1:"अपने बूथ क्षेत्र के कृषक परिवारों की जीवंत सूची बनाइए और बनाए रखिए — कौन क्या उगाता है, कितनी जमीन है, क्या कठिनाई है।",
    duty2:"प्राकृतिक खेती, बीज, मिट्टी और लागत पर BKS का प्रशिक्षण अपने गाँव तक, अपनी भाषा में पहुँचाइए।",
    duty3:"किसानों की समस्याएँ ऊपर भेजिए — फसल हानि, लागत मूल्य, मंडी भाव, सिंचाई, मुआवजे में देरी — ताकि प्रदेश इकाई उन्हें वजन के साथ उठा सके।",
    duty4:"पहले नब्बे दिनों में कम से कम दस कृषक परिवारों को BKS सदस्यता से जोड़िए।",
    duty5:"अपने बूथ की महिला किसानों और ग्रामीण युवाओं को BKS के प्रशिक्षण और उद्यम कार्यक्रमों तक पहुँचाइए।",
    claimEyebrow:"बूथ पंजीकरण", claimTitle:"अपना बूथ खोजिए। जाँचिए। अपने नाम कीजिए।",
    claimText:"आपका बूथ दो संख्याओं से पहचाना जाता है: आपका विधानसभा क्षेत्र क्रमांक (1 से 294) और आपका बूथ भाग क्रमांक। दोनों आपकी मतदाता पर्ची और मतदाता सूची पर छपे होते हैं। यदि आपको ये नहीं पता, तो अपने ग्राम पंचायत कार्यालय या निकटतम BKS कार्यकर्ता से पूछिए — और फिर भी पंजीकरण कीजिए, हम संख्या ठीक करने में मदद करेंगे।",
    guideEyebrow:"बूथ पंजीकरण सहायक",
    guideTitle:"पहला चरण: बताइए आप किस बूथ से हैं।",
    guidePrompt:"अपना जिला, विधानसभा क्षेत्र क्रमांक और बूथ क्रमांक भरिए, फिर जाँच दबाइए। मैं तुरंत बता दूँगा कि वह बूथ खाली है या नहीं।",
    guideCheck1:"आपकी मतदाता पर्ची पर दोनों संख्याएँ होती हैं",
    guideCheck2:"एक बूथ, एक प्रभारी — पहला सत्यापित दावा मान्य होगा",
    guideCheck3:"बूथ लिया जा चुका हो तो भी आप सहायक बन सकते हैं",
    guideCheck4:"BKS कार्यकर्ता सत्यापन के लिए फोन करेगा",
    finderTitle:"चरण 1 · अपना बूथ खोजिए",
    fieldDistrict:"जिला", selectDistrict:"जिला चुनिए",
    fieldAc:"विधानसभा क्षेत्र", fieldBoothNo:"बूथ / भाग संख्या", checkBooth:"इस बूथ की जाँच करें",
    boothNotListed:"मेरा बूथ सूची में नहीं है",
    formTitle:"चरण 2 · आपका विवरण",
    fieldRole:"इस बूथ पर आपकी भूमिका",
    rolePrabhari:"बूथ प्रभारी", rolePrabhariNote:"बूथ प्रमुख · प्रति बूथ एक",
    roleSahayak:"बूथ सहायक", roleSahayakNote:"सहायक स्वयंसेवक · प्रति बूथ अधिकतम चार",
    fieldName:"पूरा नाम", fieldPhone:"मोबाइल नंबर", fieldWhatsapp:"व्हाट्सएप (यदि अलग हो)", fieldEmail:"ईमेल (वैकल्पिक)",
    fieldGender:"लिंग", fieldAge:"आयु वर्ग",
    optSelect:"चुनिए", optFemale:"महिला", optMale:"पुरुष", optOther:"अन्य", optUndisclosed:"बताना नहीं चाहते",
    subheadPlace:"आप कहाँ रहते हैं",
    fieldBlock:"ब्लॉक / नगरपालिका", fieldGp:"ग्राम पंचायत / वार्ड", fieldVillage:"गाँव / पाड़ा",
    fieldBoothName:"बूथ भवन (विद्यालय आदि)", fieldYears:"इस गाँव में कितने वर्षों से", fieldLanguage:"पसंदीदा भाषा",
    subheadFarm:"आपकी कृषि पृष्ठभूमि",
    fieldOccupation:"मुख्य व्यवसाय", fieldLand:"भूमि",
    optLandless:"भूमिहीन / खेत मजदूर", optSharecropper:"बरगादार / बटाईदार", optUnder1:"1 एकड़ से कम",
    opt13:"1 से 3 एकड़", opt310:"3 से 10 एकड़", opt10p:"10 एकड़ से अधिक",
    fieldCrops:"मुख्य फसल या कृषि कार्य", fieldGroups:"आप किन किसान समूहों से जुड़े हैं (FPO, SHG, सहकारी, समिति)",
    subheadCommit:"आपका समर्पण",
    fieldHours:"प्रति सप्ताह आप कितना समय दे सकते हैं",
    optHours1:"2 घंटे से कम", optHours2:"2 से 4 घंटे", optHours3:"4 से 8 घंटे", optHours4:"8 घंटे से अधिक",
    fieldReferred:"BKS के बारे में किसने बताया (वैकल्पिक)",
    fieldSmartphone:"मेरे पास व्हाट्सएप वाला स्मार्टफोन है", fieldTravel:"मैं ब्लॉक स्तर की BKS बैठकों में जा सकता/सकती हूँ",
    fieldMotivation:"आप अपने बूथ के किसानों की सेवा क्यों करना चाहते हैं?",
    consentContact:"BKS पश्चिम बंगाल बूथ कार्य, प्रशिक्षण और सत्यापन के लिए मुझे इस नंबर पर कॉल या संदेश भेज सकता है।",
    consentData:"मेरा विवरण BKS पश्चिम बंगाल के संगठनात्मक रिकॉर्ड में रखा जा सकता है। मेरा फोन नंबर और पता सार्वजनिक नहीं किया जाएगा।",
    submitBooth:"यह बूथ लें", downloadBooth:"मेरा फॉर्म डाउनलोड करें", changeBooth:"दूसरा बूथ चुनें",
    boothFormStatus:"बूथ की पुष्टि से पहले आपके जिले का BKS कार्यकर्ता सत्यापन के लिए फोन करेगा।",
    successEyebrow:"बूथ दर्ज हुआ", successHeading:"आपका बूथ पंजीकृत हो गया।",
    successBody:"यह दावा कोड सँभालकर रखिए। आपके जिले का BKS कार्यकर्ता आपके दिए नंबर पर फोन करेगा, आपकी पहचान की पुष्टि करेगा, तब आपका बूथ पक्का होगा। उस कॉल तक आपका दावा बूथ को रोके रखता है, पर सत्यापित नहीं है।",
    downloadReceipt:"रसीद डाउनलोड करें", enrollAnother:"दूसरा बूथ पंजीकृत करें",
    boothQuote:"“गाँव कोलकाता से संगठित नहीं होता। वह उसी गाँव के एक व्यक्ति से संगठित होता है जिसने अपने आसपास के किसानों के लिए खड़े होने का निश्चय किया।”",
    footerBrand:"भारतीय कृषक समाज, पश्चिम बंगाल",
    footerText:"किसान की गरिमा, आत्मनिर्भर कृषि और प्राकृतिक समृद्धि का मंच।",
    phAcNo:"क्रमांक", phAcName:"क्षेत्र का नाम (यदि पता हो)", phPhone:"10 अंकों का मोबाइल",
    phOccupation:"किसान, बटाईदार, कृषि विक्रेता, शिक्षक, विद्यार्थी…",
    phCrops:"आमन धान, आलू, पटसन, सब्जी, मछली, दुग्ध…",
    rt:{
      needDistrict:"पहले अपना जिला चुनिए।",
      needAc:"अपना विधानसभा क्षेत्र क्रमांक भरिए, 1 से 294 के बीच।",
      needBooth:"अपना बूथ क्रमांक भरिए।",
      checking:"इस बूथ की जाँच हो रही है…",
      available:"क्षेत्र {ac} का बूथ {booth} खाली है। आप इसे बूथ प्रभारी के रूप में ले सकते हैं।",
      takenBy:"क्षेत्र {ac} के बूथ {booth} पर पहले से बूथ प्रभारी हैं — {name}। आप बूथ सहायक के रूप में जुड़ सकते हैं, या वही बूथ चुनिए जहाँ आप मतदान करते हैं।",
      takenFull:"क्षेत्र {ac} का बूथ {booth} पूरी तरह भरा है: वहाँ एक प्रभारी और {count} सहायक हैं। कृपया दूसरा बूथ चुनिए या अपने जिला दल से संपर्क कीजिए।",
      supportLeft:"इस बूथ पर {left} सहायक स्थान अब भी खाली हैं।",
      offlineCheck:"बूथ की तत्काल जाँच अभी चालू नहीं है, इसलिए उपलब्धता की पुष्टि नहीं हो सकी। फॉर्म भरिए, सत्यापन के समय BKS दल कोई भी टकराव सुलझा देगा।",
      guideOpen:"यह बूथ खाली है। अपना विवरण भरकर इसे ले लीजिए।",
      guideTaken:"इस बूथ पर पहले से प्रभारी हैं। सहायक के रूप में जुड़िए, या लौटकर अपना बूथ चुनिए।",
      submitting:"आपका बूथ पंजीकरण जमा हो रहा है…",
      successToast:"बूथ दर्ज हो गया। अपना दावा कोड सँभालकर रखिए।",
      errBoothTaken:"आपसे कुछ क्षण पहले किसी ने यह बूथ ले लिया। पृष्ठ पुनः खोलकर बूथ सहायक के रूप में जुड़िए, या अपना बूथ चुनिए।",
      errPhone:"यह मोबाइल नंबर 10 अंकों के भारतीय मोबाइल जैसा नहीं लगता।",
      errPhoneUsed:"यह मोबाइल नंबर पहले से किसी बूथ पर दर्ज है। एक स्वयंसेवक, एक बूथ। यदि यह त्रुटि है तो अपने जिला दल से संपर्क कीजिए।",
      errSupportFull:"इस बूथ पर सहायक के सभी स्थान भर चुके हैं।",
      errName:"कृपया अपना पूरा नाम भरिए।",
      errConsent:"जमा करने से पहले दोनों सहमति कथन स्वीकार कीजिए।",
      errInvalid:"फॉर्म में कुछ स्वीकार नहीं हुआ। कृपया अपनी प्रविष्टियाँ जाँचिए।",
      errOffline:"डेटाबेस अभी उपलब्ध नहीं है, इसलिए आपका फॉर्म फाइल के रूप में डाउनलोड हो गया है। कृपया इसे अपने BKS जिला दल को व्हाट्सएप पर भेजिए।",
      claimLabel:"आपका दावा कोड",
      chipPrabhari:"बूथ प्रभारी · विधानसभा {ac} · बूथ {booth} · {district}",
      chipSahayak:"बूथ सहायक · विधानसभा {ac} · बूथ {booth} · {district}"
    }
  },

  bn: {
    brand:"ভারতীয় কৃষক সমাজ", brandSub:"পশ্চিমবঙ্গ",
    navVision:"লক্ষ্য", navLeadership:"নেতৃত্ব", navDistrict:"জেলা নেতৃত্ব", navVolunteer:"বুথ স্বেচ্ছাসেবক",
    boothEyebrow:"বুথ স্বেচ্ছাসেবক নেটওয়ার্ক · পশ্চিমবঙ্গ",
    boothTitle:"প্রতিটি বুথ থেকে একজন কৃষক স্বেচ্ছাসেবক।",
    boothLead:"ভারতীয় কৃষক সমাজ, পশ্চিমবঙ্গ গড়ে উঠছে নিচ থেকে উপরে — বুথ ধরে ধরে। প্রতিটি ভোটগ্রহণ বুথে একজন বুথ প্রভারী: একজন কৃষক বা কৃষক পরিবারের সদস্য, যিনি সেই গ্রামকে চেনেন, সেখানে BKS-এর কাজ পৌঁছে দেন, এবং সেখানকার চাষিদের হয়ে কথা বলেন। আপনার বুথ খুঁজুন, দেখুন সেটি এখনও খালি কিনা, এবং সেটি নিজের নামে নিন।",
    boothMeta1Label:"একক", boothMeta1:"এক বুথ, এক প্রভারী",
    boothMeta2Label:"কারা যোগ দিতে পারেন", boothMeta2:"১৮ বছরের ঊর্ধ্বে যে কোনও কৃষক",
    boothMeta3Label:"খরচ", boothMeta3:"কিছুই নয়। কোনও দিন নয়।",
    boothCta:"আমার বুথ নিন", boothCta2:"বুথ ব্যবস্থা কীভাবে চলে",
    coverageEyebrow:"চলতি অবস্থা",
    coverageBoothsLabel:"বুথ নেওয়া হয়েছে", coverageDistrictsLabel:"সক্রিয় জেলা", coverageSupportLabel:"সহায়ক স্বেচ্ছাসেবক",
    coverageNote:"স্বেচ্ছাসেবক যোগ দেওয়ার সঙ্গে সঙ্গে সংখ্যা বাড়ে। পশ্চিমবঙ্গে ২৯৪টি বিধানসভা কেন্দ্র এবং প্রায় ৮০,০০০ ভোটগ্রহণ বুথ আছে — পথ দীর্ঘ, আর তার শুরু আপনার গ্রাম থেকে।",
    howEyebrow:"কীভাবে চলে",
    howTitle:"আসল একক জেলা নয়, বুথ।",
    howText:"একজন জেলা সভাপতি দশ হাজার কৃষককে চিনতে পারেন না। একজন বুথ স্বেচ্ছাসেবক তিনশো জনকে নাম ধরে চেনেন। বুথই সেই ক্ষুদ্রতম একক যেখানে কৃষকের সমস্যা সত্যিই চোখে পড়ে — কার জমি ডুবল, কোন পরিবার বীজ পেল না, কোন হিমঘর কাকে ঠকাল। BKS পশ্চিমবঙ্গ সেখান থেকেই উপরে ওঠে।",
    ladder1:"বুথ প্রভারী", ladder1Text:"প্রতি ভোটগ্রহণ বুথে একজন। নিজের বুথ এলাকার কৃষক পরিবারগুলিকে চেনেন, তাঁদের সমস্যা নথিভুক্ত করেন, BKS-এর প্রশিক্ষণ ও তথ্য পৌঁছে দেন এবং উপরে তাঁদের প্রতিনিধিত্ব করেন।",
    ladder2:"বুথ সহায়ক", ladder2Text:"প্রতি বুথে সর্বোচ্চ চারজন সহায়ক স্বেচ্ছাসেবক — যুবক, মহিলা কৃষক, কৃষি স্নাতক। আপনার বুথ আগেই নেওয়া হয়ে গেলে এইভাবে আপনি সেটির সেবা করতে পারেন।",
    ladder3:"গ্রাম পঞ্চায়েত ও ব্লক", ladder3Text:"একটি এলাকার বুথ প্রভারীরা মিলে পঞ্চায়েত ও ব্লক কমিটি গড়েন। বুথ স্তরের কাজ ছাড়া কেউ ব্লক পদ পাবেন না।",
    ladder4:"জেলা ও রাজ্য", ladder4Text:"যাঁরা বুথের শক্তি গড়েছেন, তাঁদের মধ্য থেকেই জেলা নেতৃত্ব বাছা হবে। মহাচার্য সৌরভ জে. সরকারের নেতৃত্বে রাজ্য কমিটি এই ভিতের উপরেই দাঁড়িয়ে, তার ঊর্ধ্বে নয়।",
    dutyEyebrow:"বুথ প্রভারী আসলে কী করেন", dutyTitle:"সপ্তাহে চার ঘণ্টা। পদ নয়, কাজ।",
    duty1:"নিজের বুথ এলাকার কৃষক পরিবারগুলির একটি জীবন্ত তালিকা গড়ুন ও রাখুন — কে কী চাষ করেন, কত জমি, কোথায় অসুবিধা।",
    duty2:"প্রাকৃতিক চাষ, বীজ, মাটি ও খরচ নিয়ে BKS-এর প্রশিক্ষণ নিজের গ্রামে, বাংলায় পৌঁছে দিন।",
    duty3:"কৃষকের সমস্যা উপরে পাঠান — ফসলের ক্ষতি, সারের দাম, বাজারদর, সেচ, ক্ষতিপূরণে দেরি — যাতে রাজ্য ইউনিট সেগুলি ওজনের সঙ্গে তুলতে পারে।",
    duty4:"প্রথম নব্বই দিনে অন্তত দশটি কৃষক পরিবারকে BKS সদস্যপদে আনুন।",
    duty5:"আপনার বুথের মহিলা কৃষক ও গ্রামীণ যুবকদের BKS-এর প্রশিক্ষণ ও উদ্যোগ কর্মসূচিতে পৌঁছে দিন।",
    claimEyebrow:"বুথ নথিভুক্তি", claimTitle:"আপনার বুথ খুঁজুন। যাচাই করুন। নিজের নামে নিন।",
    claimText:"আপনার বুথ চেনা যায় দুটি সংখ্যায়: আপনার বিধানসভা কেন্দ্রের নম্বর (১ থেকে ২৯৪) এবং আপনার বুথ পার্ট নম্বর। দুটিই আপনার ভোটার স্লিপ ও ভোটার তালিকায় ছাপা থাকে। জানা না থাকলে গ্রাম পঞ্চায়েত অফিসে বা নিকটতম BKS কর্মীকে জিজ্ঞাসা করুন — এবং তবুও নাম লেখান, আমরা নম্বর ঠিক করতে সাহায্য করব।",
    guideEyebrow:"বুথ নথিভুক্তি সহায়ক",
    guideTitle:"প্রথম ধাপ: বলুন আপনি কোন বুথের।",
    guidePrompt:"আপনার জেলা, বিধানসভা কেন্দ্রের নম্বর ও বুথ নম্বর দিন, তারপর যাচাই চাপুন। আমি সঙ্গে সঙ্গে বলে দেব বুথটি খালি আছে কিনা।",
    guideCheck1:"আপনার ভোটার স্লিপেই দুটি নম্বর আছে",
    guideCheck2:"এক বুথ, এক প্রভারী — প্রথম যাচাই হওয়া দাবিই টিকবে",
    guideCheck3:"বুথ নেওয়া হয়ে গেলেও সহায়ক হিসেবে যোগ দিতে পারেন",
    guideCheck4:"BKS কর্মী যাচাইয়ের জন্য ফোন করবেন",
    finderTitle:"ধাপ ১ · আপনার বুথ খুঁজুন",
    fieldDistrict:"জেলা", selectDistrict:"জেলা বাছুন",
    fieldAc:"বিধানসভা কেন্দ্র", fieldBoothNo:"বুথ / পার্ট নম্বর", checkBooth:"এই বুথ যাচাই করুন",
    boothNotListed:"আমার বুথ তালিকায় নেই",
    formTitle:"ধাপ ২ · আপনার তথ্য",
    fieldRole:"এই বুথে আপনার ভূমিকা",
    rolePrabhari:"বুথ প্রভারী", rolePrabhariNote:"বুথ দায়িত্বপ্রাপ্ত · প্রতি বুথে একজন",
    roleSahayak:"বুথ সহায়ক", roleSahayakNote:"সহায়ক স্বেচ্ছাসেবক · প্রতি বুথে সর্বোচ্চ চারজন",
    fieldName:"পুরো নাম", fieldPhone:"মোবাইল নম্বর", fieldWhatsapp:"হোয়াটসঅ্যাপ (আলাদা হলে)", fieldEmail:"ইমেল (ঐচ্ছিক)",
    fieldGender:"লিঙ্গ", fieldAge:"বয়সের ধাপ",
    optSelect:"বাছুন", optFemale:"মহিলা", optMale:"পুরুষ", optOther:"অন্য", optUndisclosed:"বলতে চাই না",
    subheadPlace:"আপনি কোথায় থাকেন",
    fieldBlock:"ব্লক / পুরসভা", fieldGp:"গ্রাম পঞ্চায়েত / ওয়ার্ড", fieldVillage:"গ্রাম / পাড়া",
    fieldBoothName:"বুথ ভবন (বিদ্যালয় ইত্যাদি)", fieldYears:"এই গ্রামে কত বছর", fieldLanguage:"পছন্দের ভাষা",
    subheadFarm:"আপনার কৃষি পরিচয়",
    fieldOccupation:"প্রধান পেশা", fieldLand:"জমি",
    optLandless:"ভূমিহীন / খেতমজুর", optSharecropper:"বর্গাদার / ভাগচাষি", optUnder1:"১ একরের কম",
    opt13:"১ থেকে ৩ একর", opt310:"৩ থেকে ১০ একর", opt10p:"১০ একরের বেশি",
    fieldCrops:"প্রধান ফসল বা কৃষিকাজ", fieldGroups:"আপনি কোন কৃষক গোষ্ঠীর সদস্য (FPO, SHG, সমবায়, সমিতি)",
    subheadCommit:"আপনার অঙ্গীকার",
    fieldHours:"সপ্তাহে কত সময় দিতে পারবেন",
    optHours1:"২ ঘণ্টার কম", optHours2:"২ থেকে ৪ ঘণ্টা", optHours3:"৪ থেকে ৮ ঘণ্টা", optHours4:"৮ ঘণ্টার বেশি",
    fieldReferred:"BKS-এর কথা কে বলেছেন (ঐচ্ছিক)",
    fieldSmartphone:"আমার হোয়াটসঅ্যাপসহ স্মার্টফোন আছে", fieldTravel:"আমি ব্লক স্তরের BKS সভায় যেতে পারব",
    fieldMotivation:"আপনি কেন আপনার বুথের কৃষকদের সেবা করতে চান?",
    consentContact:"BKS পশ্চিমবঙ্গ বুথের কাজ, প্রশিক্ষণ ও যাচাইয়ের জন্য এই নম্বরে আমাকে ফোন বা বার্তা পাঠাতে পারে।",
    consentData:"আমার তথ্য BKS পশ্চিমবঙ্গের সাংগঠনিক নথিতে রাখা যেতে পারে। আমার ফোন নম্বর ও ঠিকানা প্রকাশ্যে দেখানো হবে না।",
    submitBooth:"এই বুথ নিন", downloadBooth:"আমার ফর্ম ডাউনলোড করুন", changeBooth:"অন্য বুথ বাছুন",
    boothFormStatus:"বুথ নিশ্চিত হওয়ার আগে আপনার জেলার BKS কর্মী যাচাইয়ের জন্য ফোন করবেন।",
    successEyebrow:"বুথ নেওয়া হয়েছে", successHeading:"আপনার বুথ নথিভুক্ত হয়েছে।",
    successBody:"এই দাবি কোডটি রেখে দিন। আপনার জেলার BKS কর্মী আপনার দেওয়া নম্বরে ফোন করে আপনার পরিচয় যাচাই করবেন, তারপরেই আপনার বুথ নিশ্চিত হবে। সেই ফোন পর্যন্ত আপনার দাবি বুথটি ধরে রাখে, কিন্তু যাচাই হয়নি।",
    downloadReceipt:"রসিদ ডাউনলোড করুন", enrollAnother:"আরেকটি বুথ নথিভুক্ত করুন",
    boothQuote:"“গ্রাম কলকাতা থেকে সংগঠিত হয় না। সংগঠিত হয় সেই গ্রামেরই একজন মানুষের হাতে, যিনি চারপাশের কৃষকদের জন্য দাঁড়ানোর সিদ্ধান্ত নিয়েছেন।”",
    footerBrand:"ভারতীয় কৃষক সমাজ, পশ্চিমবঙ্গ",
    footerText:"কৃষকের মর্যাদা, স্বনির্ভর কৃষি ও প্রাকৃতিক সমৃদ্ধির একটি মঞ্চ।",
    phAcNo:"নম্বর", phAcName:"কেন্দ্রের নাম (জানা থাকলে)", phPhone:"১০ সংখ্যার মোবাইল",
    phOccupation:"কৃষক, ভাগচাষি, কৃষি উপকরণ বিক্রেতা, শিক্ষক, ছাত্র…",
    phCrops:"আমন ধান, আলু, পাট, সবজি, মাছ, দুধ…",
    rt:{
      needDistrict:"আগে আপনার জেলা বাছুন।",
      needAc:"আপনার বিধানসভা কেন্দ্রের নম্বর দিন, ১ থেকে ২৯৪-এর মধ্যে।",
      needBooth:"আপনার বুথ নম্বর দিন।",
      checking:"এই বুথ যাচাই করা হচ্ছে…",
      available:"কেন্দ্র {ac}-এর বুথ {booth} খালি আছে। আপনি বুথ প্রভারী হিসেবে এটি নিতে পারেন।",
      takenBy:"কেন্দ্র {ac}-এর বুথ {booth}-এ ইতিমধ্যেই একজন বুথ প্রভারী আছেন — {name}। আপনি বুথ সহায়ক হিসেবে যোগ দিতে পারেন, অথবা যে বুথে আপনি ভোট দেন সেটিই বাছুন।",
      takenFull:"কেন্দ্র {ac}-এর বুথ {booth} সম্পূর্ণ পূর্ণ: সেখানে একজন প্রভারী ও {count} জন সহায়ক আছেন। অনুগ্রহ করে অন্য বুথ বাছুন বা আপনার জেলা দলের সঙ্গে যোগাযোগ করুন।",
      supportLeft:"এই বুথে আরও {left}টি সহায়ক স্থান খালি আছে।",
      offlineCheck:"তাৎক্ষণিক বুথ যাচাই এখনও চালু হয়নি, তাই এখনই নিশ্চিত করা যাচ্ছে না। ফর্মটি পূরণ করুন, যাচাইয়ের সময় BKS দল যে কোনও সংঘাত মিটিয়ে দেবে।",
      guideOpen:"এই বুথ খালি। আপনার তথ্য দিয়ে এটি নিয়ে নিন।",
      guideTaken:"এই বুথে আগে থেকেই প্রভারী আছেন। সহায়ক হিসেবে যোগ দিন, অথবা ফিরে গিয়ে নিজের বুথ বাছুন।",
      submitting:"আপনার বুথ নথিভুক্তি জমা হচ্ছে…",
      successToast:"বুথ নেওয়া হয়েছে। আপনার দাবি কোড যত্নে রাখুন।",
      errBoothTaken:"আপনার ঠিক আগে কেউ এই বুথটি নিয়ে নিয়েছেন। পাতা নতুন করে খুলে বুথ সহায়ক হিসেবে যোগ দিন, অথবা নিজের বুথ বাছুন।",
      errPhone:"এই মোবাইল নম্বরটি ১০ সংখ্যার ভারতীয় মোবাইল নম্বরের মতো নয়।",
      errPhoneUsed:"এই মোবাইল নম্বর ইতিমধ্যেই একটি বুথে নথিভুক্ত। এক স্বেচ্ছাসেবক, এক বুথ। ভুল হয়ে থাকলে আপনার জেলা দলের সঙ্গে যোগাযোগ করুন।",
      errSupportFull:"এই বুথে সহায়কের সব স্থান পূর্ণ হয়ে গেছে।",
      errName:"অনুগ্রহ করে আপনার পুরো নাম লিখুন।",
      errConsent:"জমা দেওয়ার আগে দুটি সম্মতিই স্বীকার করুন।",
      errInvalid:"ফর্মের কিছু তথ্য গ্রহণ করা যায়নি। অনুগ্রহ করে দেখে নিন।",
      errOffline:"ডেটাবেস এখন পাওয়া যাচ্ছে না, তাই আপনার ফর্ম ফাইল হিসেবে ডাউনলোড হয়েছে। অনুগ্রহ করে সেটি আপনার BKS জেলা দলকে হোয়াটসঅ্যাপে পাঠান।",
      claimLabel:"আপনার দাবি কোড",
      chipPrabhari:"বুথ প্রভারী · বিধানসভা {ac} · বুথ {booth} · {district}",
      chipSahayak:"বুথ সহায়ক · বিধানসভা {ac} · বুথ {booth} · {district}"
    }
  }
};

/* Placeholders live outside the data-i18n text pass, so map them by selector. */
const PLACEHOLDER_KEYS = [
  ['#finderAcNo', 'phAcNo'],
  ['#finderAcNameText', 'phAcName'],
  ['[name="phone"]', 'phPhone'],
  ['[name="occupation"]', 'phOccupation'],
  ['[name="main_crops"]', 'phCrops']
];

function currentLang(){
  return document.body.dataset.lang || 'en';
}

function t(key){
  const lang = currentLang();
  return (translations[lang] && translations[lang][key]) || translations.en[key] || '';
}

function rt(key, vars){
  const lang = currentLang();
  const dict = (translations[lang] && translations[lang].rt) || translations.en.rt;
  let text = dict[key] || translations.en.rt[key] || '';
  if(vars){
    Object.keys(vars).forEach(name=>{
      text = text.split('{' + name + '}').join(vars[name]);
    });
  }
  return text;
}

function setLanguage(lang){
  if(!translations[lang]) lang = 'en';
  document.body.dataset.lang = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const value = translations[lang][el.dataset.i18n];
    if(value) el.textContent = value;
  });
  PLACEHOLDER_KEYS.forEach(([selector, key])=>{
    const el = document.querySelector(selector);
    if(el && translations[lang][key]) el.placeholder = translations[lang][key];
  });
  document.querySelectorAll('.lang-switch button').forEach(btn=>{
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  localStorage.setItem('bksLang', lang);
  refreshBoothChip();
}

document.querySelectorAll('.lang-switch button').forEach(btn=>{
  btn.addEventListener('click', ()=>setLanguage(btn.dataset.lang));
});

/* ------------------------------------------------------------------ */
/* Supabase helpers                                                    */
/* ------------------------------------------------------------------ */

function supabaseHeaders(extra){
  return Object.assign({
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json'
  }, extra || {});
}

async function callRpc(name, body){
  const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${name}`, {
    method: 'POST',
    headers: supabaseHeaders(),
    body: JSON.stringify(body)
  });
  if(!response.ok){
    const detail = await response.text().catch(()=>'');
    throw new Error(detail || `Database returned ${response.status}`);
  }
  return response.json();
}

async function selectFrom(relation, query){
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${relation}?${query}`, {
    headers: supabaseHeaders()
  });
  if(!response.ok) throw new Error(`Database returned ${response.status}`);
  return response.json();
}

/* ------------------------------------------------------------------ */
/* Booth state                                                         */
/* ------------------------------------------------------------------ */

const boothState = {
  district: '',
  ac_no: null,
  ac_name: '',
  booth_no: null,
  prabhariTaken: false,
  heldBy: '',
  supportCount: 0,
  supportLimit: SUPPORT_LIMIT,
  checked: false,
  liveCheck: true,
  booths: null,
  manualBooth: false
};

const els = {
  district: document.getElementById('finderDistrict'),
  acNo: document.getElementById('finderAcNo'),
  acName: document.getElementById('finderAcName'),
  acNameText: document.getElementById('finderAcNameText'),
  boothNo: document.getElementById('finderBoothNo'),
  boothSelect: document.getElementById('finderBoothSelect'),
  boothNotListedBtn: document.getElementById('boothNotListedBtn'),
  checkBtn: document.getElementById('checkBoothBtn'),
  result: document.getElementById('boothResult'),
  form: document.getElementById('boothVolunteerForm'),
  chip: document.getElementById('boothChip'),
  guideTitle: document.getElementById('guideTitle'),
  guidePrompt: document.getElementById('guidePrompt'),
  status: document.getElementById('boothStatus'),
  success: document.getElementById('claimSuccess'),
  claimCode: document.getElementById('claimCode'),
  finder: document.getElementById('boothFinder'),
  roleChoice: document.getElementById('roleChoice')
};

function showResult(kind, message){
  els.result.hidden = false;
  els.result.className = `booth-result ${kind}`;
  els.result.textContent = message;
}

function refreshBoothChip(){
  if(!els.chip || !boothState.checked) return;
  const role = selectedRole();
  const key = role === 'booth_sahayak' ? 'chipSahayak' : 'chipPrabhari';
  els.chip.textContent = rt(key, {
    ac: boothState.ac_no + (boothState.ac_name ? ` ${boothState.ac_name}` : ''),
    booth: boothState.booth_no,
    district: boothState.district
  });
}

function selectedRole(){
  const picked = document.querySelector('input[name="role"]:checked');
  return picked ? picked.value : 'booth_prabhari';
}

function setRoleAvailability(){
  const prabhari = document.querySelector('input[name="role"][value="booth_prabhari"]');
  const sahayak = document.querySelector('input[name="role"][value="booth_sahayak"]');
  if(!prabhari || !sahayak) return;

  const supportFull = boothState.supportCount >= boothState.supportLimit;

  prabhari.disabled = boothState.prabhariTaken;
  sahayak.disabled = supportFull;
  prabhari.closest('.role-option').classList.toggle('disabled', prabhari.disabled);
  sahayak.closest('.role-option').classList.toggle('disabled', sahayak.disabled);

  if(boothState.prabhariTaken && !supportFull){
    sahayak.checked = true;
  } else if(!boothState.prabhariTaken){
    prabhari.checked = true;
  }
  refreshBoothChip();
}

/* ------------------------------------------------------------------ */
/* Step 1 — locate and check the booth                                 */
/* ------------------------------------------------------------------ */

async function loadConstituencies(){
  if(!els.acName) return;
  let rows = [];
  try{
    rows = await selectFrom('bks_wb_constituencies', 'select=ac_no,ac_name,ac_name_bn,district&order=ac_no');
  }catch(error){
    console.info('Constituency reference not loaded, falling back to manual entry.', error);
  }
  if(!Array.isArray(rows) || rows.length === 0) return;

  boothState.constituencies = rows;
  els.acName.classList.remove('hidden');
  els.acNameText.classList.add('hidden');
  populateConstituencySelect();

  els.acName.addEventListener('change', ()=>{
    if(els.acName.value){
      els.acNo.value = els.acName.value;
      boothState.ac_name = els.acName.selectedOptions[0].dataset.name || '';
    }
  });
  els.acNo.addEventListener('input', ()=>{
    const match = rows.find(row => String(row.ac_no) === els.acNo.value);
    if(match){
      els.acName.value = String(match.ac_no);
      boothState.ac_name = match.ac_name;
    }
    populateBoothSelect();
  });
}

/* Booth reference — ships empty (see supabase-bks-booth-volunteers.sql §1b).
   When it has rows for the chosen AC, the free-text booth number becomes a
   dropdown. "My booth isn't listed" always stays available, because a
   loaded list may only cover some ACs, or some booths within an AC — partial
   coverage must never block an enrollment. */
async function loadBooths(){
  if(!els.boothSelect) return;
  let rows = [];
  try{
    rows = await selectFrom('bks_wb_booths', 'select=ac_no,booth_no,booth_name,gram_panchayat_or_ward,village_or_para&order=booth_no');
  }catch(error){
    console.info('Booth reference not loaded, falling back to manual entry.', error);
  }
  if(!Array.isArray(rows) || rows.length === 0) return;

  boothState.booths = rows;
  els.boothNotListedBtn.classList.remove('hidden');
  els.boothNotListedBtn.addEventListener('click', ()=>{
    boothState.manualBooth = true;
    els.boothSelect.classList.add('hidden');
    els.boothNo.classList.remove('hidden');
    els.boothNo.required = true;
    els.boothNo.focus();
  });
  if(els.acName){
    els.acName.addEventListener('change', populateBoothSelect);
  }
  populateBoothSelect();
}

/* Read the AC from the constituency dropdown when that is the live control,
   not from #finderAcNo. loadConstituencies() and loadBooths() both listen for
   changes on the dropdown and the listener order depends on which fetch
   resolved first — going via #finderAcNo would read a stale AC whenever the
   booth listener happens to run before the constituency one has copied the
   number across. */
function currentAcNo(){
  const fromSelect = els.acName && !els.acName.classList.contains('hidden')
    ? parseInt(els.acName.value, 10) : NaN;
  return Number.isNaN(fromSelect) ? parseInt(els.acNo.value, 10) : fromSelect;
}

function populateBoothSelect(){
  if(!els.boothSelect || boothState.manualBooth) return;
  const rows = boothState.booths || [];
  const acNo = currentAcNo();
  const scoped = acNo ? rows.filter(row => row.ac_no === acNo) : [];

  if(!scoped.length){
    els.boothSelect.classList.add('hidden');
    els.boothNo.classList.remove('hidden');
    els.boothNo.required = true;
    return;
  }

  els.boothSelect.innerHTML = `<option value="">${t('optSelect')}</option>` +
    scoped.map(row => {
      const place = row.village_or_para || row.gram_panchayat_or_ward || '';
      const label = row.booth_name ? `${row.booth_no} · ${row.booth_name}` : `${row.booth_no}${place ? ' · ' + place : ''}`;
      return `<option value="${row.booth_no}">${label}</option>`;
    }).join('');
  els.boothSelect.classList.remove('hidden');
  els.boothNo.classList.add('hidden');
  els.boothNo.required = false;
  /* checkBooth() reads #finderBoothNo, so clear it alongside the rebuilt list —
     otherwise the booth number from the previously chosen constituency
     survives into the availability check. */
  els.boothNo.value = '';
  els.boothSelect.onchange = ()=>{ els.boothNo.value = els.boothSelect.value; };
}

function populateConstituencySelect(){
  const rows = boothState.constituencies || [];
  const district = els.district.value;
  const scoped = district ? rows.filter(row => row.district === district) : rows;
  const lang = currentLang();
  els.acName.innerHTML = `<option value="">${t('optSelect')}</option>` +
    scoped.map(row => {
      const name = lang === 'bn' && row.ac_name_bn ? row.ac_name_bn : row.ac_name;
      return `<option value="${row.ac_no}" data-name="${row.ac_name}">${row.ac_no} · ${name}</option>`;
    }).join('');
}

async function checkBooth(){
  const district = els.district.value.trim();
  const acNo = parseInt(els.acNo.value, 10);
  const boothNo = parseInt(els.boothNo.value, 10);

  if(!district){ showResult('warn', rt('needDistrict')); return; }
  if(!acNo || acNo < 1 || acNo > 294){ showResult('warn', rt('needAc')); return; }
  if(!boothNo || boothNo < 1 || boothNo > 3000){ showResult('warn', rt('needBooth')); return; }

  boothState.district = district;
  boothState.ac_no = acNo;
  boothState.booth_no = boothNo;
  boothState.ac_name = (els.acName && !els.acName.classList.contains('hidden'))
    ? boothState.ac_name
    : els.acNameText.value.trim();

  showResult('checking', rt('checking'));
  els.checkBtn.disabled = true;

  try{
    const info = await callRpc('bks_booth_availability', { p_ac_no: acNo, p_booth_no: boothNo });
    boothState.liveCheck = true;
    boothState.prabhariTaken = Boolean(info && info.prabhari_taken);
    boothState.heldBy = (info && info.held_by) || '';
    boothState.supportCount = (info && info.support_count) || 0;
    boothState.supportLimit = (info && info.support_limit) || SUPPORT_LIMIT;
  }catch(error){
    console.info('Live booth check unavailable:', error);
    boothState.liveCheck = false;
    boothState.prabhariTaken = false;
    boothState.heldBy = '';
    boothState.supportCount = 0;
  }finally{
    els.checkBtn.disabled = false;
  }

  boothState.checked = true;
  renderAvailability();
}

function renderAvailability(){
  const vars = { ac: boothState.ac_no, booth: boothState.booth_no };

  if(!boothState.liveCheck){
    showResult('warn', rt('offlineCheck'));
    els.guideTitle.textContent = t('formTitle');
    els.guidePrompt.textContent = rt('offlineCheck');
  } else if(!boothState.prabhariTaken){
    const left = boothState.supportLimit - boothState.supportCount;
    showResult('open', rt('available', vars) + (left < boothState.supportLimit ? ' ' + rt('supportLeft', {left}) : ''));
    els.guideTitle.textContent = t('formTitle');
    els.guidePrompt.textContent = rt('guideOpen');
  } else if(boothState.supportCount >= boothState.supportLimit){
    showResult('full', rt('takenFull', Object.assign({count: boothState.supportCount}, vars)));
    els.guidePrompt.textContent = rt('guideTaken');
    els.form.hidden = true;
    setRoleAvailability();
    return;
  } else {
    showResult('taken', rt('takenBy', Object.assign({name: boothState.heldBy || '—'}, vars)));
    els.guideTitle.textContent = t('formTitle');
    els.guidePrompt.textContent = rt('guideTaken');
  }

  els.form.hidden = false;
  setRoleAvailability();
  els.form.scrollIntoView({behavior:'smooth', block:'start'});
}

/* ------------------------------------------------------------------ */
/* Step 2 — enrollment                                                 */
/* ------------------------------------------------------------------ */

function normalisePhone(value){
  const digits = String(value || '').replace(/\D/g, '');
  return digits.length > 10 ? digits.slice(-10) : digits;
}

function collectEnrollment(){
  const data = Object.fromEntries(new FormData(els.form).entries());
  return {
    district: boothState.district,
    ac_no: boothState.ac_no,
    ac_name: boothState.ac_name || null,
    booth_no: boothState.booth_no,
    role: selectedRole(),
    full_name: (data.full_name || '').trim(),
    phone: normalisePhone(data.phone),
    whatsapp: normalisePhone(data.whatsapp) || null,
    email: (data.email || '').trim() || null,
    gender: data.gender || null,
    age_band: data.age_band || null,
    preferred_language: data.preferred_language || null,
    block_or_municipality: (data.block_or_municipality || '').trim() || null,
    gram_panchayat_or_ward: (data.gram_panchayat_or_ward || '').trim() || null,
    village_or_para: (data.village_or_para || '').trim() || null,
    booth_name: (data.booth_name || '').trim() || null,
    years_in_village: data.years_in_village || null,
    occupation: (data.occupation || '').trim() || null,
    land_holding: data.land_holding || null,
    main_crops: (data.main_crops || '').trim() || null,
    farmer_groups: (data.farmer_groups || '').trim() || null,
    hours_per_week: data.hours_per_week || null,
    has_smartphone: Boolean(data.has_smartphone),
    can_travel_to_block: Boolean(data.can_travel_to_block),
    motivation: (data.motivation || '').trim() || null,
    referred_by: (data.referred_by || '').trim() || null,
    consent_contact: Boolean(data.consent_contact),
    consent_data: Boolean(data.consent_data),
    source: 'bks-west-bengal-platform',
    language_context: currentLang(),
    submitted_at: new Date().toISOString()
  };
}

function downloadJson(payload, prefix){
  const safe = `${payload.ac_no || 'ac'}-${payload.booth_no || 'booth'}-${payload.full_name || 'volunteer'}`
    .toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const blob = new Blob([JSON.stringify(payload, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${prefix}-${safe || 'volunteer'}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

const FAILURE_MESSAGES = {
  booth_taken: 'errBoothTaken',
  phone_already_enrolled: 'errPhoneUsed',
  support_slots_full: 'errSupportFull',
  invalid_phone: 'errPhone',
  invalid_name: 'errName',
  consent_required: 'errConsent',
  invalid_booth: 'errInvalid',
  invalid_role: 'errInvalid',
  invalid_field: 'errInvalid'
};

function setStatus(kind, message){
  els.status.className = `form-status ${kind}`;
  els.status.textContent = message;
}

let lastPayload = null;

if(els.form){
  els.form.addEventListener('change', event=>{
    if(event.target.name === 'role') refreshBoothChip();
  });

  els.form.addEventListener('submit', async event=>{
    event.preventDefault();
    if(!els.form.reportValidity()) return;

    const payload = collectEnrollment();
    lastPayload = payload;

    if(!/^[6-9]\d{9}$/.test(payload.phone)){
      setStatus('error', rt('errPhone'));
      return;
    }

    const submitBtn = els.form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    setStatus('', rt('submitting'));

    try{
      const result = await callRpc('bks_claim_booth', { payload });
      if(result && result.ok){
        showSuccess(result, payload);
        return;
      }
      const key = FAILURE_MESSAGES[result && result.reason] || 'errInvalid';
      const held = result && result.held_by;
      setStatus('error', held ? rt(key) + ` (${held})` : rt(key));
      if(result && result.reason === 'booth_taken'){
        boothState.prabhariTaken = true;
        boothState.heldBy = held || '';
        setRoleAvailability();
      }
    }catch(error){
      console.warn('Booth enrollment fallback:', error);
      downloadJson(payload, 'bks-booth-volunteer');
      setStatus('error', rt('errOffline'));
    }finally{
      submitBtn.disabled = false;
    }
  });
}

function showSuccess(result, payload){
  els.form.hidden = true;
  els.finder.hidden = true;
  els.success.hidden = false;
  els.claimCode.textContent = `${rt('claimLabel')}: ${result.claim_code}`;
  lastPayload = Object.assign({}, payload, {
    claim_code: result.claim_code,
    status: result.status,
    role: result.role
  });
  els.success.scrollIntoView({behavior:'smooth', block:'center'});
  loadCoverage();
}

const downloadFormBtn = document.getElementById('downloadBoothForm');
if(downloadFormBtn){
  downloadFormBtn.addEventListener('click', ()=>{
    downloadJson(collectEnrollment(), 'bks-booth-volunteer');
  });
}

const downloadReceiptBtn = document.getElementById('downloadReceipt');
if(downloadReceiptBtn){
  downloadReceiptBtn.addEventListener('click', ()=>{
    if(lastPayload) downloadJson(lastPayload, 'bks-booth-receipt');
  });
}

const changeBoothBtn = document.getElementById('changeBoothBtn');
if(changeBoothBtn){
  changeBoothBtn.addEventListener('click', ()=>{
    els.form.hidden = true;
    els.result.hidden = true;
    boothState.checked = false;
    els.finder.scrollIntoView({behavior:'smooth', block:'center'});
  });
}

if(els.checkBtn){
  els.checkBtn.addEventListener('click', checkBooth);
}

if(els.district){
  els.district.addEventListener('change', ()=>{
    if(boothState.constituencies) populateConstituencySelect();
    populateBoothSelect();
  });
}

/* ------------------------------------------------------------------ */
/* Live coverage strip                                                 */
/* ------------------------------------------------------------------ */

async function loadCoverage(){
  const boothsEl = document.getElementById('coverageBooths');
  const districtsEl = document.getElementById('coverageDistricts');
  const supportEl = document.getElementById('coverageSupport');
  if(!boothsEl) return;
  try{
    const rows = await selectFrom('bks_booth_coverage', 'select=district,booths_covered,support_volunteers');
    const booths = rows.reduce((sum, row)=> sum + Number(row.booths_covered || 0), 0);
    const support = rows.reduce((sum, row)=> sum + Number(row.support_volunteers || 0), 0);
    boothsEl.textContent = booths.toLocaleString('en-IN');
    districtsEl.textContent = rows.length.toLocaleString('en-IN');
    supportEl.textContent = support.toLocaleString('en-IN');
  }catch(error){
    console.info('Coverage counters unavailable:', error);
    boothsEl.textContent = '0';
    districtsEl.textContent = '0';
    supportEl.textContent = '0';
  }
}

setLanguage(localStorage.getItem('bksLang') || 'en');
loadConstituencies();
loadBooths();
loadCoverage();
