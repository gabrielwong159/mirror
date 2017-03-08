mainDirectory[KEY_2] = busPage.init.bind(busPage);
mainDirectory[KEY_3] = newsPage.init.bind(newsPage);
mainDirectory[KEY_4] = dirPage.init.bind(dirPage);
mainDirectory[KEY_5] = calPage.init.bind(calPage);
mainDirectory[KEY_6] = agendaPage.init.bind(agendaPage);

busDirectory[KEY_1] = mainPage.init.bind(mainPage);

newsDirectory[KEY_1] = mainPage.init.bind(mainPage);

dirDirectory[KEY_1] = mainPage.init.bind(mainPage);
dirDirectory[KEY_2] = loadDirectory;
dirDirectory[KEY_3] = printCanteen;
dirDirectory[KEY_4] = printAudi;
dirDirectory[KEY_5] = printAHLT;
dirDirectory[KEY_6] = printFabLab;