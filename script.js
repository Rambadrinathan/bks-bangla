const SUPABASE_URL = 'https://lhnorkjfldywnrqqunqn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxobm9ya2pmbGR5d25ycXF1bnFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4MzgxMjcsImV4cCI6MjA4NzQxNDEyN30.y90MFaq7qJ4YxuF-6HsY0WUZ9zSDJYwfl6F5r-JJrxI';
const APPLICATION_TABLE = 'bks_district_leadership_applications';

const translations = {
  en: {
    brand:"Bharatiya Krishak Samaj", brandSub:"West Bengal",
    navVision:"Vision", navLeadership:"Leadership", navAgenda:"Agenda", navBengal:"Bengal", navVolunteer:"Booth volunteers",
    boothLinkEyebrow:"Booth Volunteer Network",
    boothLinkTitle:"One farmer volunteer from every booth in West Bengal.",
    boothLinkText:"District leadership is only the top of the structure. The organisation itself is built booth by booth — one Booth Prabhari for each polling booth, who knows the farming families around them by name. Volunteers enroll for their own booth through a separate enrollment system.",
    boothLinkCta:"Go to booth volunteer enrollment",
    heroEyebrow:"30 June 2026 · New Delhi",
    heroKicker:"Official Appointment · West Bengal State President",
    heroTitle:"Mahacharya Sourabh J. Sarkar appointed President of Bharatiya Krishak Samaj, West Bengal.",
    heroLead:"In a significant meeting with BKS representatives and National President Dr. Krishan Bir Chaudhary, the appointment letter was formally handed over to Mahacharya Ji, marking a new chapter for farmer organisation, income growth and natural agriculture in West Bengal.",
    metaPlaceLabel:"Place", metaPlace:"New Delhi",
    metaConferredLabel:"Conferred by", metaConferred:"Dr. Krishan Bir Chaudhary",
    metaMandateLabel:"Mandate", metaMandate:"Strengthen BKS across West Bengal",
    heroButton:"Read the appointment note", heroButton2:"View the day’s programme",
    congratsTitle:"Heartiest congratulations",
    congratsText:"श्री सौरभजी सरकार को भारतीय कृषक समाज, पश्चिम बंगाल के प्रदेशाध्यक्ष पद पर नियुक्ति होने पर हार्दिक बधाई एवं शुभकामनाएं।",
    meetingNote:"The appointment was conferred by Dr. Krishan Bir Chaudhary, National President of Bharatiya Krishak Samaj, in the presence of BKS representatives.",
    storyEyebrow:"The June 30 appointment meeting",
    storyTitle:"A day of recognition, responsibility and farmer-first resolve.",
    storyText:"The day’s programme included a meeting with BKS representatives, interaction with Dr. Krishan Bir Chaudhary, and the formal handing over of the appointment letter naming Mahacharya Sourabh J. Sarkar as President of Bharatiya Krishak Samaj for West Bengal.",
    capMeeting:"Meeting with BKS representatives in New Delhi.",
    capDelegation:"BKS office bearers present during the appointment letter handover.",
    capLetter:"The commemorative appointment plaque appointing Shri Sourabh J. Sarkar as President, West Bengal.",
    note1Title:"Message of congratulations",
    note1Text:"A BKS representative congratulated Maharaj Ji and Smt. Reena Ji, noting that under his leadership the organisation in West Bengal will become stronger and work toward increasing farmers’ income.",
    note2Title:"Next organisational step",
    note2Text:"The note also records the plan to organise a ceremony in Kolkata, form state, divisional and district-level BKS units, and invite leaders from other states under the guidance of National President Dr. Krishan Bir Chaudhary.",
    stat1:"Millions of farming families", stat1Sub:"Cultivators, sharecroppers, farm workers and rural entrepreneurs",
    stat2:"Small farms, big future", stat2Sub:"A state where marginal and small farmers need strong organisation",
    stat3:"Natural + modern", stat3Sub:"Indigenous wisdom supported by training, technology and markets",
    visionEyebrow:"The West Bengal Wing", visionTitle:"A platform for farmer dignity, knowledge and voice.",
    visionP1:"Bharatiya Krishak Samaj, West Bengal, is envisioned as a farmer-centred platform that listens first, organises patiently, and helps cultivators move toward resilient, profitable and ecologically balanced agriculture.",
    visionP2:"The Bengal wing will focus on training, awareness, farmer consultation, natural and chemical-conscious farming, seed sovereignty, indigenous inputs, value addition, market readiness and the confidence to speak with one voice.",
    legacyEyebrow:"National Legacy", legacyTitle:"BKS carries the spirit of the annadata.",
    legacyText:"The organisation stands for the Indian farmer’s right to dignity, fair policy, self-reliance, indigenous agricultural strength and practical knowledge that improves income without weakening soil, seed or community life.",
    value1:"Farmer voice", value1Text:"Consultation, representation and policy feedback rooted in field realities.",
    value2:"Swadeshi strength", value2Text:"Promotion of indigenous, locally suitable and self-reliant farming systems.",
    value3:"Natural agriculture", value3Text:"Chemical-free and organic practices wherever feasible, with soil health at the centre.",
    value4:"Farmer enterprise", value4Text:"Training farmers to become knowledge-led, market-aware rural entrepreneurs.",
    drEyebrow:"National Guidance", drTitle:"Dr. Krishan Bir Chaudhary",
    drText:"President of Bharatiya Krishak Samaj and a prominent agricultural leader, Dr. Chaudhary has been associated with national farmer policy, MSP discussions, State Farms Corporation of India, Indian Sugarcane Development Council, NAFED, SFAC and farmer advocacy through Kisan Ki Awaaz.",
    mjEyebrow:"West Bengal Leadership", mjTitle:"Mahacharya Shri Sourabh J. Sarkar",
    mjText:"Agriculturist-educationist, urban farming pioneer, founder of KarmYog for the 21st Century, and large-scale culture and behaviour-change expert, Mahacharya Ji brings three decades of experience in farmer education, rural youth skilling, organic food systems, technology-led learning and community transformation.",
    profileEnglish:"Profile PDF", profileHindi:"Hindi Profile",
    agendaEyebrow:"Action Agenda", agendaTitle:"How BKS West Bengal can serve farmers.",
    agenda1:"Training and field seminars", agenda1Text:"Village-level sessions on profitable, sustainable, chemical-conscious and natural farming practices.",
    agenda2:"Seed and soil sovereignty", agenda2Text:"Awareness around native varieties, seed rights, soil health and the long-term security of Indian agriculture.",
    agenda3:"Organic and indigenous inputs", agenda3Text:"Promotion of organic manure, bio-inputs, local resources, natural methods and safer alternatives.",
    agenda4:"Farmer entrepreneurship", agenda4Text:"Helping farmers understand value addition, packaging, direct markets, farm tourism, urban demand and digital storytelling.",
    agenda5:"Policy voice", agenda5Text:"Structured feedback from farmers to public institutions on MSP, markets, inputs, water, crop choice and risk.",
    agenda6:"Youth and women in agriculture", agenda6Text:"Building pride and livelihood pathways for rural youth, women farmers and family-led farm enterprises.",
    bengalEyebrow:"West Bengal Opportunity", bengalTitle:"From fertile land to living prosperity.",
    bengalText:"West Bengal’s agriculture is diverse: paddy, vegetables, fruits, flowers, fisheries, livestock, wetlands, peri-urban farms and dense village economies. The opportunity is to connect this diversity with natural farming, training, aggregation, farmer-owned knowledge systems and better public representation.",
    opp1:"Regenerative Bengal", opp1Text:"Soil, water and biodiversity restoration through farmer-led practices.",
    opp2:"Urban-rural food bridges", opp2Text:"Connecting safe, local produce to Kolkata and Bengal’s growing cities.",
    opp3:"Training at scale", opp3Text:"Using KarmYog’s learning systems to carry quality guidance to thousands of farmers.",
    aiEyebrow:"AI for Annadata",
    aiTitle:"Using artificial intelligence as a farmer’s practical companion.",
    aiText:"BKS West Bengal will explore AI not as a distant technology, but as a local-language support system for farmers: helping them access timely knowledge, improve decisions, document field realities and connect better with markets, institutions and training networks.",
    ai1:"Local-language advisory", ai1Text:"Voice and WhatsApp-style guidance in Bengali, Hindi and simple English for crop care, soil health and natural input preparation.",
    ai2:"Training at population scale", ai2Text:"AI-assisted micro-lessons, videos, quizzes and field checklists to make expert knowledge available beyond one-time seminars.",
    ai3:"Market and risk intelligence", ai3Text:"Simple dashboards and alerts around weather, crop risk, demand trends, prices, aggregation and value-addition opportunities.",
    ai4:"Farmer voice and documentation", ai4Text:"Structured collection of farmer issues, success stories, field data and policy feedback so Bengal’s farmers can be heard with clarity.",
    enrollEyebrow:"Build the organisation", enrollTitle:"District Leadership Enrollment Platform",
    enrollText:"As President of BKS West Bengal, Mahacharya Ji’s next responsibility is to identify, evaluate and appoint district heads across the state. This platform can become the official intake system for candidates who wish to serve farmers in their district.",
    agentEyebrow:"BKS Enrollment Sahayak", agentTitle:"I will help you prepare your district leadership application.",
    agentPrompt:"Start with your district and role preference. A strong application should show credibility, farmer connect, service record, local network and a practical 90-day action plan.",
    agentCheck1:"Credentials and public-service background", agentCheck2:"Agriculture / farmer work experience", agentCheck3:"District network and mobilisation ability", agentCheck4:"Vision for farmer income, natural farming and technology",
    fieldName:"Full name", fieldPhone:"Mobile / WhatsApp", fieldEmail:"Email", fieldDistrict:"District", fieldRole:"Role applied for", fieldLanguage:"Preferred language",
    fieldCredentials:"Credentials / public work / organisation experience",
    fieldFarmerWork:"Work already done for farmers, nursery, natural farming, rural livelihood or community mobilisation",
    fieldVision:"Why do you want to become a BKS district head? What is your vision for your district?",
    fieldPlan:"Your first 90-day action plan",
    fieldNetwork:"Your district network: blocks, farmer groups, institutions, mandis, youth/women networks",
    submitApplication:"Submit application", downloadApplication:"Download application JSON",
    formStatus:"Applications will be reviewed by the BKS West Bengal leadership team before any appointment decision.",
    quote:"“The farmer is not only a producer of food. The farmer is the keeper of soil, seed, culture and national resilience.”",
    footerBrand:"Bharatiya Krishak Samaj, West Bengal", footerText:"A vision platform for farmer dignity, self-reliant agriculture and natural prosperity."
  },
  hi: {
    brand:"भारतीय कृषक समाज", brandSub:"पश्चिम बंगाल",
    navVision:"दृष्टि", navLeadership:"नेतृत्व", navAgenda:"कार्ययोजना", navBengal:"बंगाल", navVolunteer:"बूथ स्वयंसेवक",
    boothLinkEyebrow:"बूथ स्वयंसेवक नेटवर्क",
    boothLinkTitle:"पश्चिम बंगाल के हर बूथ से एक किसान स्वयंसेवक।",
    boothLinkText:"जिला नेतृत्व ढाँचे का केवल शिखर है। संगठन तो बूथ दर बूथ बनता है — हर मतदान बूथ पर एक बूथ प्रभारी, जो अपने आसपास के कृषक परिवारों को नाम से जानता है। स्वयंसेवक अपने बूथ के लिए एक अलग पंजीकरण व्यवस्था से जुड़ते हैं।",
    boothLinkCta:"बूथ स्वयंसेवक पंजीकरण पर जाएँ",
    heroEyebrow:"30 जून 2026 · नई दिल्ली",
    heroKicker:"औपचारिक नियुक्ति · पश्चिम बंगाल राज्य अध्यक्ष",
    heroTitle:"महाचार्य सौरभ जे. सरकार भारतीय कृषक समाज, पश्चिम बंगाल के अध्यक्ष नियुक्त।",
    heroLead:"BKS प्रतिनिधियों और राष्ट्रीय अध्यक्ष डॉ. कृषन बीर चौधरी के साथ महत्वपूर्ण बैठक में महाचार्य जी को नियुक्ति पत्र औपचारिक रूप से सौंपा गया। यह पश्चिम बंगाल में किसान संगठन, किसान आय वृद्धि और प्राकृतिक कृषि के नए अध्याय की शुरुआत है।",
    metaPlaceLabel:"स्थान", metaPlace:"नई दिल्ली",
    metaConferredLabel:"प्रदान किया", metaConferred:"डॉ. कृषन बीर चौधरी",
    metaMandateLabel:"दायित्व", metaMandate:"पश्चिम बंगाल में BKS को मजबूत करना",
    heroButton:"नियुक्ति संदेश पढ़ें", heroButton2:"दिन का कार्यक्रम देखें",
    congratsTitle:"हार्दिक बधाई",
    congratsText:"श्री सौरभजी सरकार को भारतीय कृषक समाज, पश्चिम बंगाल के प्रदेशाध्यक्ष पद पर नियुक्ति होने पर हार्दिक बधाई एवं शुभकामनाएं।",
    meetingNote:"यह नियुक्ति भारतीय कृषक समाज के राष्ट्रीय अध्यक्ष डॉ. कृषन बीर चौधरी द्वारा BKS प्रतिनिधियों की उपस्थिति में प्रदान की गई।",
    storyEyebrow:"30 जून की नियुक्ति बैठक",
    storyTitle:"सम्मान, जिम्मेदारी और किसान-प्रथम संकल्प का दिन।",
    storyText:"दिन के कार्यक्रम में BKS प्रतिनिधियों के साथ बैठक, डॉ. कृषन बीर चौधरी से संवाद और महाचार्य सौरभ जे. सरकार को भारतीय कृषक समाज, पश्चिम बंगाल का अध्यक्ष नियुक्त करने वाला औपचारिक नियुक्ति पत्र सौंपना शामिल था।",
    capMeeting:"नई दिल्ली में BKS प्रतिनिधियों के साथ बैठक।",
    capDelegation:"नियुक्ति पत्र सौंपे जाने के समय BKS पदाधिकारी उपस्थित रहे।",
    capLetter:"श्री सौरभ जे. सरकार को पश्चिम बंगाल अध्यक्ष नियुक्त करने वाली स्मारक नियुक्ति पट्टिका।",
    note1Title:"बधाई संदेश",
    note1Text:"BKS प्रतिनिधि ने महाराज जी और श्रीमती रीना जी को बधाई देते हुए कहा कि उनके नेतृत्व में पश्चिम बंगाल में संगठन मजबूत होगा और किसानों की आय वृद्धि की दिशा में कार्य करेगा।",
    note2Title:"अगला संगठनात्मक कदम",
    note2Text:"संदेश में कोलकाता में समारोह आयोजित करने, राज्य, विभागीय और जिला स्तर की BKS इकाइयां गठित करने और राष्ट्रीय अध्यक्ष डॉ. कृषन बीर चौधरी के मार्गदर्शन में अन्य राज्यों के अध्यक्षों को आमंत्रित करने की योजना भी दर्ज है।",
    stat1:"लाखों किसान परिवार", stat1Sub:"कृषक, बटाईदार, खेत मज़दूर और ग्रामीण उद्यमी",
    stat2:"छोटे खेत, बड़ा भविष्य", stat2Sub:"ऐसा राज्य जहां छोटे और सीमांत किसानों को मजबूत संगठन की आवश्यकता है",
    stat3:"प्राकृतिक + आधुनिक", stat3Sub:"प्रशिक्षण, तकनीक और बाज़ारों से समर्थित स्वदेशी ज्ञान",
    visionEyebrow:"पश्चिम बंगाल इकाई", visionTitle:"किसान गरिमा, ज्ञान और आवाज़ का मंच।",
    visionP1:"भारतीय कृषक समाज, पश्चिम बंगाल को एक किसान-केंद्रित मंच के रूप में देखा गया है जो पहले सुनता है, धैर्य से संगठित करता है और किसानों को अधिक टिकाऊ, लाभकारी और पारिस्थितिक संतुलन वाली खेती की ओर ले जाता है।",
    visionP2:"बंगाल इकाई प्रशिक्षण, जागरूकता, किसान संवाद, प्राकृतिक और रसायन-सचेत खेती, बीज स्वराज, स्वदेशी इनपुट, मूल्य संवर्धन, बाज़ार तैयारी और एकजुट किसान आवाज़ पर कार्य करेगी।",
    legacyEyebrow:"राष्ट्रीय परंपरा", legacyTitle:"BKS अन्नदाता की भावना को आगे बढ़ाता है।",
    legacyText:"संगठन भारतीय किसान की गरिमा, न्यायपूर्ण नीति, आत्मनिर्भरता, स्वदेशी कृषि शक्ति और ऐसी व्यावहारिक जानकारी के पक्ष में खड़ा है जो मिट्टी, बीज और समुदाय को कमजोर किए बिना आय बढ़ाए।",
    value1:"किसान आवाज़", value1Text:"जमीनी वास्तविकताओं पर आधारित संवाद, प्रतिनिधित्व और नीति प्रतिक्रिया।",
    value2:"स्वदेशी शक्ति", value2Text:"स्थानीय रूप से उपयुक्त, स्वदेशी और आत्मनिर्भर कृषि प्रणालियों का प्रचार।",
    value3:"प्राकृतिक कृषि", value3Text:"जहां संभव हो रसायन-मुक्त और जैविक पद्धतियां, मिट्टी के स्वास्थ्य को केंद्र में रखते हुए।",
    value4:"किसान उद्यमिता", value4Text:"किसानों को ज्ञान-आधारित और बाज़ार-सचेत ग्रामीण उद्यमी बनाना।",
    drEyebrow:"राष्ट्रीय मार्गदर्शन", drTitle:"डॉ. कृषन बीर चौधरी",
    drText:"भारतीय कृषक समाज के अध्यक्ष और प्रमुख कृषि नेता डॉ. चौधरी राष्ट्रीय किसान नीति, MSP विमर्श, स्टेट फार्म्स कॉरपोरेशन ऑफ इंडिया, भारतीय गन्ना विकास परिषद, NAFED, SFAC और किसान की आवाज़ के माध्यम से किसान advocacy से जुड़े रहे हैं।",
    mjEyebrow:"पश्चिम बंगाल नेतृत्व", mjTitle:"महाचार्य श्री सौरभ जे. सरकार",
    mjText:"कृषि-शिक्षाविद, शहरी खेती अग्रणी, KarmYog for the 21st Century के संस्थापक और बड़े पैमाने पर संस्कृति एवं व्यवहार परिवर्तन विशेषज्ञ महाचार्य जी किसान शिक्षा, ग्रामीण युवा कौशल, जैविक खाद्य प्रणालियों, तकनीक-सक्षम सीखने और सामुदायिक परिवर्तन का तीन दशकों का अनुभव लाते हैं।",
    profileEnglish:"प्रोफ़ाइल PDF", profileHindi:"हिंदी प्रोफ़ाइल",
    agendaEyebrow:"कार्ययोजना", agendaTitle:"BKS पश्चिम बंगाल किसानों की कैसे सेवा करेगा।",
    agenda1:"प्रशिक्षण और क्षेत्रीय संगोष्ठी", agenda1Text:"लाभकारी, टिकाऊ, रसायन-सचेत और प्राकृतिक खेती पर गांव-स्तरीय सत्र।",
    agenda2:"बीज और मिट्टी स्वराज", agenda2Text:"देशी बीज, बीज अधिकार, मिट्टी स्वास्थ्य और भारतीय कृषि की दीर्घकालिक सुरक्षा पर जागरूकता।",
    agenda3:"जैविक और स्वदेशी इनपुट", agenda3Text:"जैविक खाद, जैव-इनपुट, स्थानीय संसाधन, प्राकृतिक तरीकों और सुरक्षित विकल्पों का प्रचार।",
    agenda4:"किसान उद्यमिता", agenda4Text:"मूल्य संवर्धन, पैकेजिंग, प्रत्यक्ष बाज़ार, फार्म टूरिज्म, शहरी मांग और डिजिटल storytelling की समझ।",
    agenda5:"नीति आवाज़", agenda5Text:"MSP, बाज़ार, इनपुट, जल, फसल चयन और जोखिम पर किसानों की संरचित प्रतिक्रिया।",
    agenda6:"युवा और महिला किसान", agenda6Text:"ग्रामीण युवाओं, महिला किसानों और परिवार-आधारित कृषि उद्यमों के लिए गर्व और आजीविका के रास्ते।",
    bengalEyebrow:"पश्चिम बंगाल अवसर", bengalTitle:"उपजाऊ भूमि से जीवंत समृद्धि तक।",
    bengalText:"पश्चिम बंगाल की कृषि विविध है: धान, सब्ज़ियां, फल, फूल, मत्स्य, पशुपालन, wetlands, peri-urban खेती और घनी ग्रामीण अर्थव्यवस्थाएं। अवसर है इस विविधता को प्राकृतिक खेती, प्रशिक्षण, aggregation, किसान-स्वामित्व वाले ज्ञान और बेहतर प्रतिनिधित्व से जोड़ना।",
    opp1:"पुनर्योजी बंगाल", opp1Text:"किसान-नेतृत्व वाली पद्धतियों से मिट्टी, जल और जैव विविधता की बहाली।",
    opp2:"शहर-गांव खाद्य सेतु", opp2Text:"सुरक्षित स्थानीय उपज को कोलकाता और बंगाल के बढ़ते शहरों से जोड़ना।",
    opp3:"बड़े पैमाने पर प्रशिक्षण", opp3Text:"KarmYog की learning systems से हजारों किसानों तक गुणवत्तापूर्ण मार्गदर्शन।",
    aiEyebrow:"अन्नदाता के लिए AI",
    aiTitle:"कृत्रिम बुद्धिमत्ता को किसान का व्यावहारिक साथी बनाना।",
    aiText:"BKS पश्चिम बंगाल AI को दूर की तकनीक नहीं, बल्कि किसानों के लिए स्थानीय भाषा में सहायक व्यवस्था के रूप में देखेगा—समय पर ज्ञान, बेहतर निर्णय, खेत की वास्तविकताओं का दस्तावेज़ीकरण और बाज़ार, संस्थाओं व प्रशिक्षण नेटवर्क से बेहतर जुड़ाव के लिए।",
    ai1:"स्थानीय भाषा सलाह", ai1Text:"फसल देखभाल, मिट्टी स्वास्थ्य और प्राकृतिक इनपुट तैयारी के लिए बंगाली, हिंदी और सरल अंग्रेज़ी में voice और WhatsApp-style मार्गदर्शन।",
    ai2:"जन-स्तर पर प्रशिक्षण", ai2Text:"AI-सहायता प्राप्त micro-lessons, videos, quizzes और field checklists ताकि विशेषज्ञ ज्ञान एक बार की seminar से आगे भी उपलब्ध रहे।",
    ai3:"बाज़ार और जोखिम जानकारी", ai3Text:"मौसम, फसल जोखिम, मांग, कीमत, aggregation और value-addition अवसरों पर सरल dashboards और alerts।",
    ai4:"किसान आवाज़ और दस्तावेज़ीकरण", ai4Text:"किसान समस्याओं, success stories, field data और policy feedback का संरचित संग्रह ताकि बंगाल के किसान स्पष्टता से सुने जाएं।",
    enrollEyebrow:"संगठन निर्माण", enrollTitle:"जिला नेतृत्व नामांकन प्लेटफॉर्म",
    enrollText:"BKS पश्चिम बंगाल के अध्यक्ष के रूप में महाचार्य जी की अगली जिम्मेदारी पूरे राज्य में जिला अध्यक्षों की पहचान, मूल्यांकन और नियुक्ति करना है। यह प्लेटफॉर्म उन उम्मीदवारों के लिए आधिकारिक intake system बन सकता है जो अपने जिले के किसानों की सेवा करना चाहते हैं।",
    agentEyebrow:"BKS नामांकन सहायक", agentTitle:"मैं जिला नेतृत्व आवेदन तैयार करने में आपकी मदद करूंगा।",
    agentPrompt:"अपने जिले और भूमिका से शुरुआत करें। मजबूत आवेदन में विश्वसनीयता, किसान संपर्क, सेवा रिकॉर्ड, स्थानीय नेटवर्क और व्यावहारिक 90-दिन की कार्ययोजना दिखनी चाहिए।",
    agentCheck1:"योग्यता और सार्वजनिक सेवा पृष्ठभूमि", agentCheck2:"कृषि / किसान कार्य अनुभव", agentCheck3:"जिला नेटवर्क और mobilisation क्षमता", agentCheck4:"किसान आय, प्राकृतिक खेती और तकनीक के लिए दृष्टि",
    fieldName:"पूरा नाम", fieldPhone:"मोबाइल / WhatsApp", fieldEmail:"ईमेल", fieldDistrict:"जिला", fieldRole:"आवेदन की भूमिका", fieldLanguage:"प्राथमिक भाषा",
    fieldCredentials:"योग्यता / सार्वजनिक कार्य / संगठन अनुभव",
    fieldFarmerWork:"किसानों, नर्सरी, प्राकृतिक खेती, ग्रामीण आजीविका या community mobilisation में किया गया कार्य",
    fieldVision:"आप BKS जिला प्रमुख क्यों बनना चाहते हैं? अपने जिले के लिए आपकी दृष्टि क्या है?",
    fieldPlan:"आपकी पहली 90-दिन की कार्ययोजना",
    fieldNetwork:"आपका जिला नेटवर्क: blocks, farmer groups, institutions, mandis, youth/women networks",
    submitApplication:"आवेदन जमा करें", downloadApplication:"Application JSON डाउनलोड करें",
    formStatus:"किसी भी नियुक्ति निर्णय से पहले आवेदन BKS पश्चिम बंगाल नेतृत्व टीम द्वारा समीक्षा किए जाएंगे।",
    quote:"“किसान केवल अन्न उत्पादक नहीं है। किसान मिट्टी, बीज, संस्कृति और राष्ट्रीय सामर्थ्य का रक्षक है।”",
    footerBrand:"भारतीय कृषक समाज, पश्चिम बंगाल", footerText:"किसान गरिमा, आत्मनिर्भर कृषि और प्राकृतिक समृद्धि का दृष्टि मंच।"
  },
  bn: {
    brand:"ভারতীয় কৃষক সমাজ", brandSub:"পশ্চিমবঙ্গ",
    navVision:"দৃষ্টি", navLeadership:"নেতৃত্ব", navAgenda:"কর্মসূচি", navBengal:"বাংলা", navVolunteer:"বুথ স্বেচ্ছাসেবক",
    boothLinkEyebrow:"বুথ স্বেচ্ছাসেবক নেটওয়ার্ক",
    boothLinkTitle:"পশ্চিমবঙ্গের প্রতিটি বুথ থেকে একজন কৃষক স্বেচ্ছাসেবক।",
    boothLinkText:"জেলা নেতৃত্ব কাঠামোর কেবল উপরের স্তর। সংগঠন গড়ে ওঠে বুথ ধরে ধরে — প্রতিটি ভোটগ্রহণ বুথে একজন বুথ প্রভারী, যিনি চারপাশের কৃষক পরিবারগুলিকে নাম ধরে চেনেন। স্বেচ্ছাসেবকরা নিজের বুথের জন্য একটি আলাদা নথিভুক্তি ব্যবস্থার মাধ্যমে যোগ দেন।",
    boothLinkCta:"বুথ স্বেচ্ছাসেবক নথিভুক্তিতে যান",
    heroEyebrow:"৩০ জুন ২০২৬ · নয়াদিল্লি",
    heroKicker:"আনুষ্ঠানিক নিয়োগ · পশ্চিমবঙ্গ রাজ্য সভাপতি",
    heroTitle:"মহাচার্য সৌরভ জে. সরকার ভারতীয় কৃষক সমাজ, পশ্চিমবঙ্গের সভাপতি নিযুক্ত।",
    heroLead:"BKS প্রতিনিধিদের সঙ্গে এবং জাতীয় সভাপতি ড. কৃষন বীর চৌধুরীর উপস্থিতিতে মহাচার্যজির হাতে আনুষ্ঠানিক নিয়োগপত্র তুলে দেওয়া হয়। এর মাধ্যমে পশ্চিমবঙ্গে কৃষক সংগঠন, কৃষক আয় বৃদ্ধি এবং প্রাকৃতিক কৃষির নতুন অধ্যায় শুরু হল।",
    metaPlaceLabel:"স্থান", metaPlace:"নয়াদিল্লি",
    metaConferredLabel:"প্রদান করেন", metaConferred:"ড. কৃষন বীর চৌধুরী",
    metaMandateLabel:"দায়িত্ব", metaMandate:"পশ্চিমবঙ্গে BKS শক্তিশালী করা",
    heroButton:"নিয়োগ বার্তা পড়ুন", heroButton2:"দিনের কর্মসূচি দেখুন",
    congratsTitle:"আন্তরিক অভিনন্দন",
    congratsText:"শ্রী সৌরভজি সরকারকে ভারতীয় কৃষক সমাজ, পশ্চিমবঙ্গের प्रदेशाध्यक्ष পদে নিযুক্ত হওয়ায় আন্তরিক অভিনন্দন ও শুভেচ্ছা।",
    meetingNote:"ভারতীয় কৃষক সমাজের জাতীয় সভাপতি ড. কৃষন বীর চৌধুরী BKS প্রতিনিধিদের উপস্থিতিতে এই নিয়োগ প্রদান করেন।",
    storyEyebrow:"৩০ জুনের নিয়োগ বৈঠক",
    storyTitle:"স্বীকৃতি, দায়িত্ব ও কৃষক-প্রথম সংকল্পের দিন।",
    storyText:"দিনের কর্মসূচিতে BKS প্রতিনিধিদের সঙ্গে বৈঠক, ড. কৃষন বীর চৌধুরীর সঙ্গে আলোচনা এবং মহাচার্য সৌরভ জে. সরকারকে ভারতীয় কৃষক সমাজ, পশ্চিমবঙ্গের সভাপতি হিসেবে নিয়োগের আনুষ্ঠানিক পত্র প্রদান অন্তর্ভুক্ত ছিল।",
    capMeeting:"নয়াদিল্লিতে BKS প্রতিনিধিদের সঙ্গে বৈঠক।",
    capDelegation:"নিয়োগপত্র প্রদানকালে উপস্থিত BKS পদাধিকারীরা।",
    capLetter:"শ্রী সৌরভ জে. সরকারকে পশ্চিমবঙ্গ সভাপতি হিসেবে নিয়োগের স্মারক ফলক।",
    note1Title:"অভিনন্দন বার্তা",
    note1Text:"BKS প্রতিনিধি মহারাজজি ও শ্রীমতী রীনা জিকে অভিনন্দন জানিয়ে বলেন, তাঁর নেতৃত্বে পশ্চিমবঙ্গে সংগঠন শক্তিশালী হবে এবং কৃষকদের আয় বৃদ্ধির লক্ষ্যে কাজ এগোবে।",
    note2Title:"পরবর্তী সাংগঠনিক পদক্ষেপ",
    note2Text:"বার্তায় কলকাতায় অনুষ্ঠান আয়োজন, রাজ্য, বিভাগীয় ও জেলা স্তরের BKS ইউনিট গঠন এবং জাতীয় সভাপতি ড. কৃষন বীর চৌধুরীর নেতৃত্বে অন্যান্য রাজ্যের সভাপতিদের আমন্ত্রণের পরিকল্পনাও উল্লেখ করা হয়েছে।",
    stat1:"লক্ষ লক্ষ কৃষক পরিবার", stat1Sub:"চাষি, ভাগচাষি, কৃষি শ্রমিক ও গ্রামীণ উদ্যোক্তা",
    stat2:"ছোট জমি, বড় ভবিষ্যৎ", stat2Sub:"যেখানে ছোট ও প্রান্তিক কৃষকদের শক্তিশালী সংগঠন জরুরি",
    stat3:"প্রাকৃতিক + আধুনিক", stat3Sub:"প্রশিক্ষণ, প্রযুক্তি ও বাজারের সঙ্গে দেশজ জ্ঞানের সমন্বয়",
    visionEyebrow:"পশ্চিমবঙ্গ শাখা", visionTitle:"কৃষকের মর্যাদা, জ্ঞান ও কণ্ঠস্বরের মঞ্চ।",
    visionP1:"ভারতীয় কৃষক সমাজ, পশ্চিমবঙ্গকে কৃষককেন্দ্রিক একটি মঞ্চ হিসেবে ভাবা হয়েছে—যে মঞ্চ আগে শুনবে, ধৈর্যের সঙ্গে সংগঠিত করবে এবং কৃষকদের স্থিতিশীল, লাভজনক ও পরিবেশ-সমন্বিত কৃষির পথে এগিয়ে দেবে।",
    visionP2:"বাংলা শাখা প্রশিক্ষণ, সচেতনতা, কৃষক পরামর্শ, প্রাকৃতিক ও রাসায়নিক-সচেতন কৃষি, বীজ স্বরাজ, দেশজ ইনপুট, মূল্য সংযোজন, বাজার প্রস্তুতি ও ঐক্যবদ্ধ কৃষক কণ্ঠস্বর গঠনে কাজ করবে।",
    legacyEyebrow:"জাতীয় উত্তরাধিকার", legacyTitle:"BKS অন্নদাতার চেতনাকে বহন করে।",
    legacyText:"সংগঠন ভারতীয় কৃষকের মর্যাদা, ন্যায্য নীতি, স্বনির্ভরতা, দেশজ কৃষি শক্তি এবং এমন বাস্তব জ্ঞানের পক্ষে দাঁড়ায় যা মাটি, বীজ ও সমাজকে দুর্বল না করে আয় বাড়ায়।",
    value1:"কৃষকের কণ্ঠস্বর", value1Text:"ক্ষেত্রের বাস্তবতার ভিত্তিতে পরামর্শ, প্রতিনিধিত্ব ও নীতি প্রতিক্রিয়া।",
    value2:"স্বদেশী শক্তি", value2Text:"স্থানীয়ভাবে উপযুক্ত, দেশজ ও স্বনির্ভর কৃষি ব্যবস্থার প্রসার।",
    value3:"প্রাকৃতিক কৃষি", value3Text:"যেখানে সম্ভব রাসায়নিক-মুক্ত ও জৈব পদ্ধতি, মাটির স্বাস্থ্যকে কেন্দ্রে রেখে।",
    value4:"কৃষক উদ্যোক্তা", value4Text:"কৃষকদের জ্ঞাননির্ভর ও বাজার-সচেতন গ্রামীণ উদ্যোক্তা হিসেবে গড়ে তোলা।",
    drEyebrow:"জাতীয় দিশা", drTitle:"ড. কৃষন বীর চৌধুরী",
    drText:"ভারতীয় কৃষক সমাজের সভাপতি এবং বিশিষ্ট কৃষি নেতা ড. চৌধুরী জাতীয় কৃষক নীতি, MSP আলোচনা, State Farms Corporation of India, Indian Sugarcane Development Council, NAFED, SFAC এবং Kisan Ki Awaaz-এর মাধ্যমে কৃষক স্বার্থের পক্ষে কাজের সঙ্গে যুক্ত।",
    mjEyebrow:"পশ্চিমবঙ্গ নেতৃত্ব", mjTitle:"মহাচার্য শ্রী সৌরভ জে. সরকার",
    mjText:"কৃষি-শিক্ষাবিদ, নগর কৃষির অগ্রদূত, KarmYog for the 21st Century-এর প্রতিষ্ঠাতা এবং বৃহৎ পরিসরের সংস্কৃতি ও আচরণ পরিবর্তন বিশেষজ্ঞ মহাচার্যজি কৃষক শিক্ষা, গ্রামীণ যুব দক্ষতা, জৈব খাদ্য ব্যবস্থা, প্রযুক্তিনির্ভর শিক্ষা ও সমাজ রূপান্তরের তিন দশকের অভিজ্ঞতা নিয়ে আসছেন।",
    profileEnglish:"প্রোফাইল PDF", profileHindi:"হিন্দি প্রোফাইল",
    agendaEyebrow:"কর্মসূচি", agendaTitle:"BKS পশ্চিমবঙ্গ কীভাবে কৃষকদের পাশে দাঁড়াবে।",
    agenda1:"প্রশিক্ষণ ও মাঠ সেমিনার", agenda1Text:"লাভজনক, টেকসই, রাসায়নিক-সচেতন ও প্রাকৃতিক কৃষি নিয়ে গ্রামস্তরের সেশন।",
    agenda2:"বীজ ও মাটি স্বরাজ", agenda2Text:"দেশজ জাত, বীজ অধিকার, মাটির স্বাস্থ্য ও ভারতীয় কৃষির দীর্ঘমেয়াদি নিরাপত্তা নিয়ে সচেতনতা।",
    agenda3:"জৈব ও দেশজ ইনপুট", agenda3Text:"জৈব সার, বায়ো-ইনপুট, স্থানীয় সম্পদ, প্রাকৃতিক পদ্ধতি ও নিরাপদ বিকল্পের প্রসার।",
    agenda4:"কৃষক উদ্যোক্তা", agenda4Text:"মূল্য সংযোজন, প্যাকেজিং, সরাসরি বাজার, ফার্ম ট্যুরিজম, নগর চাহিদা ও ডিজিটাল গল্প বলার দক্ষতা।",
    agenda5:"নীতিগত কণ্ঠস্বর", agenda5Text:"MSP, বাজার, ইনপুট, জল, ফসল নির্বাচন ও ঝুঁকি নিয়ে কৃষকদের সংগঠিত মতামত।",
    agenda6:"যুব ও নারী কৃষক", agenda6Text:"গ্রামীণ যুব, নারী কৃষক ও পরিবারভিত্তিক কৃষি উদ্যোগের জন্য গর্ব ও জীবিকার পথ।",
    bengalEyebrow:"পশ্চিমবঙ্গের সুযোগ", bengalTitle:"উর্বর জমি থেকে জীবন্ত সমৃদ্ধি।",
    bengalText:"পশ্চিমবঙ্গের কৃষি বহুবিধ: ধান, সবজি, ফল, ফুল, মৎস্য, পশুপালন, জলাভূমি, শহরতলির কৃষি এবং ঘন গ্রামীণ অর্থনীতি। সুযোগ হল এই বৈচিত্র্যকে প্রাকৃতিক কৃষি, প্রশিক্ষণ, aggregation, কৃষক-নিয়ন্ত্রিত জ্ঞানব্যবস্থা ও উন্নত প্রতিনিধিত্বের সঙ্গে যুক্ত করা।",
    opp1:"পুনরুজ্জীবনশীল বাংলা", opp1Text:"কৃষক-নেতৃত্বাধীন চর্চার মাধ্যমে মাটি, জল ও জীববৈচিত্র্য পুনরুদ্ধার।",
    opp2:"শহর-গ্রাম খাদ্য সেতু", opp2Text:"নিরাপদ স্থানীয় উৎপাদনকে কলকাতা ও বাংলার ক্রমবর্ধমান শহরগুলির সঙ্গে যুক্ত করা।",
    opp3:"বৃহৎ পরিসরে প্রশিক্ষণ", opp3Text:"KarmYog-এর learning systems দিয়ে হাজার হাজার কৃষকের কাছে মানসম্মত দিশা পৌঁছে দেওয়া।",
    aiEyebrow:"অন্নদাতার জন্য AI",
    aiTitle:"কৃত্রিম বুদ্ধিমত্তাকে কৃষকের বাস্তব সহচর করা।",
    aiText:"BKS পশ্চিমবঙ্গ AI-কে দূরের প্রযুক্তি হিসেবে নয়, কৃষকদের জন্য স্থানীয় ভাষার সহায়তা ব্যবস্থা হিসেবে ব্যবহার করতে চায়—সময়মতো জ্ঞান, ভাল সিদ্ধান্ত, ক্ষেত্রের বাস্তবতার নথিভুক্তি এবং বাজার, প্রতিষ্ঠান ও প্রশিক্ষণ নেটওয়ার্কের সঙ্গে উন্নত সংযোগের জন্য।",
    ai1:"স্থানীয় ভাষায় পরামর্শ", ai1Text:"ফসল পরিচর্যা, মাটির স্বাস্থ্য এবং প্রাকৃতিক ইনপুট তৈরির জন্য বাংলা, হিন্দি ও সহজ ইংরেজিতে voice ও WhatsApp-style দিশা।",
    ai2:"বৃহৎ পরিসরে প্রশিক্ষণ", ai2Text:"AI-সহায়ক micro-lessons, videos, quizzes ও field checklists যাতে বিশেষজ্ঞ জ্ঞান একবারের seminar-এর বাইরে পৌঁছায়।",
    ai3:"বাজার ও ঝুঁকি বুদ্ধিমত্তা", ai3Text:"আবহাওয়া, ফসল ঝুঁকি, চাহিদা, দাম, aggregation ও value-addition সুযোগ নিয়ে সহজ dashboards ও alerts।",
    ai4:"কৃষকের কণ্ঠস্বর ও নথিভুক্তি", ai4Text:"কৃষক সমস্যা, success stories, field data ও policy feedback-এর সংগঠিত সংগ্রহ যাতে বাংলার কৃষকদের কথা স্পষ্টভাবে শোনা যায়।",
    enrollEyebrow:"সংগঠন গড়ে তোলা", enrollTitle:"জেলা নেতৃত্ব নামांकन প্ল্যাটফর্ম",
    enrollText:"BKS পশ্চিমবঙ্গের সভাপতি হিসেবে মহাচার্যজির পরবর্তী দায়িত্ব হল রাজ্যজুড়ে জেলা নেতৃত্ব চিহ্নিত, মূল্যায়ন ও নিয়োগ করা। এই প্ল্যাটফর্ম তাদের জন্য official intake system হতে পারে যারা নিজের জেলার কৃষকদের সেবা করতে চান।",
    agentEyebrow:"BKS Enrollment Sahayak", agentTitle:"আমি আপনার জেলা নেতৃত্বের আবেদন প্রস্তুত করতে সাহায্য করব।",
    agentPrompt:"আপনার জেলা ও পছন্দের ভূমিকা দিয়ে শুরু করুন। একটি শক্তিশালী আবেদনে বিশ্বাসযোগ্যতা, কৃষক সংযোগ, সেবার অভিজ্ঞতা, স্থানীয় নেটওয়ার্ক এবং বাস্তবসম্মত ৯০ দিনের পরিকল্পনা থাকা উচিত।",
    agentCheck1:"যোগ্যতা ও জনসেবার পটভূমি", agentCheck2:"কৃষি / কৃষক কাজের অভিজ্ঞতা", agentCheck3:"জেলা নেটওয়ার্ক ও mobilisation ক্ষমতা", agentCheck4:"কৃষক আয়, প্রাকৃতিক কৃষি ও প্রযুক্তির দৃষ্টি",
    fieldName:"পূর্ণ নাম", fieldPhone:"মোবাইল / WhatsApp", fieldEmail:"ইমেল", fieldDistrict:"জেলা", fieldRole:"যে পদের জন্য আবেদন", fieldLanguage:"পছন্দের ভাষা",
    fieldCredentials:"যোগ্যতা / জনসেবা / সংগঠন অভিজ্ঞতা",
    fieldFarmerWork:"কৃষক, নার্সারি, প্রাকৃতিক কৃষি, গ্রামীণ জীবিকা বা community mobilisation-এ পূর্ব কাজ",
    fieldVision:"আপনি কেন BKS জেলা প্রধান হতে চান? আপনার জেলার জন্য আপনার দৃষ্টি কী?",
    fieldPlan:"আপনার প্রথম ৯০ দিনের কর্মপরিকল্পনা",
    fieldNetwork:"আপনার জেলা নেটওয়ার্ক: block, farmer group, institution, mandi, youth/women network",
    submitApplication:"আবেদন জমা দিন", downloadApplication:"Application JSON ডাউনলোড করুন",
    formStatus:"যে কোনও নিয়োগ সিদ্ধান্তের আগে আবেদন BKS পশ্চিমবঙ্গ নেতৃত্ব দল পর্যালোচনা করবে।",
    quote:"“কৃষক শুধু খাদ্য উৎপাদক নন। কৃষক মাটি, বীজ, সংস্কৃতি ও জাতীয় স্থিতিশীলতার রক্ষক।”",
    footerBrand:"ভারতীয় কৃষক সমাজ, পশ্চিমবঙ্গ", footerText:"কৃষকের মর্যাদা, স্বনির্ভর কৃষি ও প্রাকৃতিক সমৃদ্ধির দৃষ্টি মঞ্চ।"
  }
};

function setLanguage(lang){
  document.body.dataset.lang = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.dataset.i18n;
    if(translations[lang][key]) el.textContent = translations[lang][key];
  });
  document.querySelectorAll('.lang-switch button').forEach(btn=>{
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  localStorage.setItem('bksLang', lang);
}

document.querySelectorAll('.lang-switch button').forEach(btn=>{
  btn.addEventListener('click', ()=>setLanguage(btn.dataset.lang));
});

setLanguage(localStorage.getItem('bksLang') || 'en');

function collectApplication(){
  const form = document.getElementById('districtApplicationForm');
  const data = Object.fromEntries(new FormData(form).entries());
  return {
    ...data,
    source: 'bks-west-bengal-platform',
    status: 'new',
    language_context: document.body.dataset.lang || 'en',
    submitted_at: new Date().toISOString()
  };
}

function downloadApplicationJson(){
  const data = collectApplication();
  const safeName = `${data.district || 'district'}-${data.full_name || 'candidate'}`.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `bks-application-${safeName || 'candidate'}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

async function submitToSupabase(data){
  if(!SUPABASE_URL || !SUPABASE_ANON_KEY) throw new Error('Supabase is not configured.');
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${APPLICATION_TABLE}`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify(data)
  });
  if(!response.ok){
    const detail = await response.text().catch(()=>'');
    throw new Error(detail || `Database returned ${response.status}`);
  }
}

const form = document.getElementById('districtApplicationForm');
const statusEl = document.getElementById('formStatus');
const agentPrompt = document.getElementById('agentPrompt');

if(form){
  form.addEventListener('input', ()=>{
    const data = collectApplication();
    const filled = ['full_name','phone','district','role_applied','credentials','farmer_work','vision','ninety_day_plan'].filter(k => (data[k] || '').trim().length > 0).length;
    if(filled < 3){
      agentPrompt.textContent = translations[document.body.dataset.lang || 'en'].agentPrompt;
    } else if(filled < 6){
      agentPrompt.textContent = document.body.dataset.lang === 'hi'
        ? 'अच्छी शुरुआत। अब अपने किसान कार्य, स्थानीय नेटवर्क और जिले के लिए स्पष्ट 90-दिन की योजना को मजबूत करें।'
        : document.body.dataset.lang === 'bn'
          ? 'ভাল শুরু। এখন আপনার কৃষক কাজ, স্থানীয় নেটওয়ার্ক এবং জেলার জন্য স্পষ্ট ৯০ দিনের পরিকল্পনা শক্তিশালী করুন।'
          : 'Good start. Now strengthen your farmer work, district network and clear 90-day plan.';
    } else {
      agentPrompt.textContent = document.body.dataset.lang === 'hi'
        ? 'आवेदन मजबूत दिख रहा है। जमा करने से पहले फोन नंबर, जिला और भूमिका अवश्य जांच लें।'
        : document.body.dataset.lang === 'bn'
          ? 'আবেদন শক্তিশালী দেখাচ্ছে। জমা দেওয়ার আগে ফোন নম্বর, জেলা ও ভূমিকা দেখে নিন।'
          : 'This is shaping into a strong application. Check phone, district and role before submission.';
    }
  });

  form.addEventListener('submit', async (event)=>{
    event.preventDefault();
    if(!form.reportValidity()) return;
    const data = collectApplication();
    statusEl.className = 'form-status';
    statusEl.textContent = document.body.dataset.lang === 'hi'
      ? 'आवेदन जमा किया जा रहा है...'
      : document.body.dataset.lang === 'bn'
        ? 'আবেদন জমা হচ্ছে...'
        : 'Submitting application...';
    try{
      await submitToSupabase(data);
      statusEl.className = 'form-status success';
      statusEl.textContent = document.body.dataset.lang === 'hi'
        ? 'आवेदन सफलतापूर्वक जमा हो गया। BKS पश्चिम बंगाल टीम समीक्षा करेगी।'
        : document.body.dataset.lang === 'bn'
          ? 'আবেদন সফলভাবে জমা হয়েছে। BKS পশ্চিমবঙ্গ দল পর্যালোচনা করবে।'
          : 'Application submitted successfully. The BKS West Bengal team will review it.';
      form.reset();
    }catch(error){
      console.warn('Supabase submission fallback:', error);
      downloadApplicationJson();
      statusEl.className = 'form-status error';
      statusEl.textContent = document.body.dataset.lang === 'hi'
        ? 'डेटाबेस अभी सक्रिय नहीं है, इसलिए आपका आवेदन JSON फ़ाइल के रूप में डाउनलोड हो गया है। इसे BKS टीम को भेजें।'
        : document.body.dataset.lang === 'bn'
          ? 'ডাটাবেস এখনও সক্রিয় নয়, তাই আপনার আবেদন JSON ফাইল হিসেবে ডাউনলোড হয়েছে। এটি BKS দলকে পাঠান।'
          : 'Database capture is not active yet, so your application has been downloaded as a JSON file. Please send it to the BKS team.';
    }
  });
}

const downloadBtn = document.getElementById('downloadApplication');
if(downloadBtn){
  downloadBtn.addEventListener('click', ()=>{
    if(form && !form.reportValidity()) return;
    downloadApplicationJson();
  });
}
