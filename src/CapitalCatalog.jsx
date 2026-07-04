import React, { useState, useEffect } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { ArrowLeft, Gauge, SlidersHorizontal, Lock } from "lucide-react";

const CARDS = [
  {
    id: "deposit",
    code: "INV-01",
    category: "Инвестиции",
    name: "Банковский вклад",
    oneLiner: "Фиксированный процент за размещение денег в банке",
    forWhom: "Кто хочет сохранить капитал и не готов рисковать",
    notFor: "Кто хочет обогнать инфляцию или вырастить капитал в разы",
    how: "Банк платит заранее оговорённый процент за пользование вашими деньгами в течение срока вклада. Доход известен заранее, риск минимален и частично застрахован.",
    minCapital: 1000,
    expectedAnnualReturn: 4,
    weeklyHours: 0,
    paybackMonths: null,
    employeesRequired: 0,
    liquidityScore: 6,
    profitPessimistic: 2,
    profitRealistic: 3,
    profitOptimistic: 6,
    launch: "1 день",
    skills: "Не требуются",
    ownerInvolvement: 1,
    volatility: "Низкая",
    risks: ["Риск банка", "Инфляционный риск"],
    scalability: "Линейная от суммы",
    automation: "Полная",
    geo: "Полная",
    radar: { Доходность: null, Риск: 1, Сложность: 1, Трудоёмкость: null, Гибкость: 8, Масштаб: 2 },
  },
  {
    id: "etf",
    code: "INV-02",
    category: "Инвестиции",
    name: "ETF",
    oneLiner: "Диверсифицированный портфель активов, торгуемый как одна бумага",
    forWhom: "Кто хочет доступ к рынку без выбора отдельных компаний",
    notFor: "Кто хочет активно управлять и обгонять рынок",
    how: "Вы покупаете долю в фонде, который держит десятки или сотни активов. Доход складывается из роста цены и дивидендов. Диверсификация снижает риск отдельной компании.",
    minCapital: 3000,
    expectedAnnualReturn: 8,
    weeklyHours: 0.5,
    paybackMonths: null,
    employeesRequired: 0,
    liquidityScore: 9,
    profitPessimistic: 10,
    profitRealistic: 20,
    profitOptimistic: 36,
    launch: "1 день",
    skills: "Базовая финансовая грамотность",
    ownerInvolvement: 2,
    volatility: "Средняя",
    risks: ["Рыночный риск"],
    scalability: "Линейная от суммы",
    automation: "Полная",
    geo: "Полная",
    radar: { Доходность: null, Риск: 4, Сложность: 2, Трудоёмкость: null, Гибкость: 9, Масштаб: 4 },
  },
  {
    id: "franchise",
    code: "ENT-01",
    category: "Предпринимательство",
    name: "Франшиза",
    oneLiner: "Готовая бизнес-модель под чужим брендом за роялти",
    forWhom: "Кто хочет предпринимательство со сниженным риском ошибок",
    notFor: "Кто хочет полную свободу решений и свой бренд",
    how: "Франчайзер даёт бренд, стандарты и поддержку. Франчайзи вкладывает капитал, управляет точкой на месте и платит роялти с оборота.",
    minCapital: 300000,
    expectedAnnualReturn: 15,
    weeklyHours: 35,
    paybackMonths: 30,
    employeesRequired: 4,
    liquidityScore: 2,
    profitPessimistic: 1875,
    profitRealistic: 3750,
    profitOptimistic: 6750,
    launch: "3–6 месяцев",
    skills: "Управление, операционка",
    ownerInvolvement: 7,
    volatility: "Средне-высокая",
    risks: ["Рыночный", "Операционный", "Юридический"],
    scalability: "Средняя, через новые точки",
    automation: "Частичная",
    geo: "Низкая",
    radar: { Доходность: null, Риск: 6, Сложность: 5, Трудоёмкость: null, Гибкость: 3, Масштаб: 5 },
  },
  {
    id: "vending-coffee",
    code: "OTH-01",
    category: "Прочее",
    name: "Кофейня самообслуживания",
    oneLiner: "Точка вендингового формата с минимальным персоналом",
    forWhom: "Кто хочет малый бизнес с низким уровнем вовлечённости",
    notFor: "Кто ищет высокую доходность или быстрый масштаб",
    how: "Автоматизированное оборудование продаёт напиток без продавца. Доход строится на трафике локации и марже с одной чашки.",
    minCapital: 150000,
    expectedAnnualReturn: 12,
    weeklyHours: 8,
    paybackMonths: 24,
    employeesRequired: 0,
    liquidityScore: 2,
    profitPessimistic: 750,
    profitRealistic: 1500,
    profitOptimistic: 2700,
    launch: "1–3 месяца",
    skills: "Базовые, работа с поставщиками",
    ownerInvolvement: 6,
    volatility: "Средняя",
    risks: ["Рыночный (трафик)", "Операционный (сервис)"],
    scalability: "Средняя, тиражирование точек",
    automation: "Высокая",
    geo: "Низкая",
    radar: { Доходность: null, Риск: 5, Сложность: 4, Трудоёмкость: null, Гибкость: 5, Масштаб: 5 },
  },
  {
    id: "rental",
    code: "RE-01",
    category: "Недвижимость",
    name: "Аренда квартиры",
    oneLiner: "Сдача жилой недвижимости в долгосрочную аренду",
    forWhom: "Кто хочет пассивный доход через реальный актив",
    notFor: "У кого нет капитала на весь объект или кто не готов к неликвидности",
    how: "Покупка квартиры и сдача её в аренду. Доход равен арендной плате за вычетом расходов, плюс потенциальный рост стоимости актива.",
    minCapital: 2000000,
    expectedAnnualReturn: 6,
    weeklyHours: 3,
    paybackMonths: null,
    employeesRequired: 0,
    liquidityScore: 1,
    profitPessimistic: 5000,
    profitRealistic: 10000,
    profitOptimistic: 18000,
    launch: "1–3 месяца",
    skills: "Понимание рынка недвижимости",
    ownerInvolvement: 3,
    volatility: "Низкая–средняя",
    risks: ["Рыночный", "Юридический", "Риск простоя"],
    scalability: "Низкая, нужен новый капитал на объект",
    automation: "Средняя, делегируется УК",
    geo: "Низкая",
    radar: { Доходность: null, Риск: 3, Сложность: 3, Трудоёмкость: null, Гибкость: 4, Масштаб: 2 },
  },
  {
    id: "stocks",
    code: "INV-03",
    category: "Инвестиции",
    name: "Акции",
    oneLiner: "Доля в конкретной компании, торгуемая на бирже",
    forWhom: "Кто готов анализировать компании ради более высокой доходности",
    notFor: "Кто хочет предсказуемость и не готов следить за отдельным эмитентом",
    how: "Вы покупаете долю в одной компании. Доход складывается из роста котировок и дивидендов, но зависит от результатов именно этой компании, а не рынка в целом.",
    minCapital: 5000,
    expectedAnnualReturn: 10,
    weeklyHours: 2,
    paybackMonths: null,
    employeesRequired: 0,
    liquidityScore: 9,
    profitPessimistic: 21,
    profitRealistic: 42,
    profitOptimistic: 75,
    launch: "1 день",
    skills: "Анализ отчётности, финансовая грамотность",
    ownerInvolvement: 3,
    volatility: "Высокая",
    risks: ["Рыночный", "Риск отдельной компании"],
    scalability: "Линейная от суммы",
    automation: "Полная",
    geo: "Полная",
    radar: { Доходность: null, Риск: 7, Сложность: 4, Трудоёмкость: null, Гибкость: 8, Масштаб: 4 },
  },
  {
    id: "bonds",
    code: "INV-04",
    category: "Инвестиции",
    name: "Облигации",
    oneLiner: "Долговая бумага с фиксированным купонным доходом",
    forWhom: "Кто хочет предсказуемый доход выше вклада при умеренном риске",
    notFor: "Кто гонится за высокой доходностью",
    how: "Вы даёте деньги в долг государству или компании на срок, получая купонные выплаты и номинал в конце срока. Доход известен заранее при удержании до погашения.",
    minCapital: 5000,
    expectedAnnualReturn: 5,
    weeklyHours: 0.5,
    paybackMonths: null,
    employeesRequired: 0,
    liquidityScore: 7,
    profitPessimistic: 10,
    profitRealistic: 21,
    profitOptimistic: 38,
    launch: "1 день",
    skills: "Базовая финансовая грамотность",
    ownerInvolvement: 2,
    volatility: "Низкая–средняя",
    risks: ["Кредитный риск эмитента", "Процентный риск"],
    scalability: "Линейная от суммы",
    automation: "Полная",
    geo: "Полная",
    radar: { Доходность: null, Риск: 3, Сложность: 2, Трудоёмкость: null, Гибкость: 8, Масштаб: 3 },
  },
  {
    id: "crypto",
    code: "INV-05",
    category: "Инвестиции",
    name: "Криптовалюты",
    oneLiner: "Цифровой актив вне традиционной финансовой системы",
    forWhom: "Кто готов к высокой волатильности ради потенциальной доходности",
    notFor: "Кто не готов к риску полной потери капитала",
    how: "Вы покупаете цифровой актив на бирже или в кошелёк. Доход строится исключительно на изменении цены — ни дивидендов, ни купонов нет.",
    minCapital: 1000,
    expectedAnnualReturn: 20,
    weeklyHours: 1,
    paybackMonths: null,
    employeesRequired: 0,
    liquidityScore: 9,
    profitPessimistic: 8,
    profitRealistic: 17,
    profitOptimistic: 30,
    launch: "1 день",
    skills: "Понимание блокчейна, риск-менеджмент",
    ownerInvolvement: 2,
    volatility: "Очень высокая",
    risks: ["Рыночный", "Регуляторный", "Риск полной потери"],
    scalability: "Линейная от суммы",
    automation: "Полная",
    geo: "Полная",
    radar: { Доходность: null, Риск: 9, Сложность: 3, Трудоёмкость: null, Гибкость: 9, Масштаб: 4 },
  },
  {
    id: "buy-business",
    code: "ENT-02",
    category: "Предпринимательство",
    name: "Покупка готового бизнеса",
    oneLiner: "Приобретение уже работающей компании с историей и клиентами",
    forWhom: "Кто хочет предпринимательство без стадии запуска с нуля",
    notFor: "Кто не готов вложить крупный капитал сразу и разбираться в чужих процессах",
    how: "Вы покупаете действующий бизнес целиком — с клиентами, командой и денежным потоком. Доход начинается сразу, но зависит от того, насколько верно оценена и передана компания.",
    minCapital: 1000000,
    expectedAnnualReturn: 14,
    weeklyHours: 25,
    paybackMonths: 36,
    employeesRequired: 8,
    liquidityScore: 1,
    profitPessimistic: 5833,
    profitRealistic: 11667,
    profitOptimistic: 21000,
    launch: "3–6 месяцев (сделка)",
    skills: "Due diligence, управление, переговоры",
    ownerInvolvement: 6,
    volatility: "Средняя",
    risks: ["Риск переоценки актива", "Операционный", "Риск потери ключевых людей"],
    scalability: "Средняя",
    automation: "Частичная",
    geo: "Низкая",
    radar: { Доходность: null, Риск: 6, Сложность: 7, Трудоёмкость: null, Гибкость: 3, Масштаб: 5 },
  },
  {
    id: "online-shop",
    code: "ONL-01",
    category: "Онлайн",
    name: "Интернет-магазин",
    oneLiner: "Продажа товаров через собственный сайт или маркетплейс",
    forWhom: "Кто хочет предпринимательство с низким порогом входа и без аренды помещения",
    notFor: "Кто не готов к ценовой конкуренции и постоянной работе с трафиком",
    how: "Вы закупаете или производите товар и продаёте его через сайт или маркетплейс. Доход равен марже с продажи за вычетом рекламы, логистики и комиссий площадки.",
    minCapital: 50000,
    expectedAnnualReturn: 12,
    weeklyHours: 25,
    paybackMonths: 14,
    employeesRequired: 1,
    liquidityScore: 2,
    profitPessimistic: 250,
    profitRealistic: 500,
    profitOptimistic: 900,
    launch: "1–2 месяца",
    skills: "Маркетинг, работа с поставщиками",
    ownerInvolvement: 6,
    volatility: "Средне-высокая",
    risks: ["Рыночный (конкуренция)", "Операционный (логистика)"],
    scalability: "Высокая",
    automation: "Средняя",
    geo: "Средняя–высокая",
    radar: { Доходность: null, Риск: 6, Сложность: 4, Трудоёмкость: null, Гибкость: 5, Масштаб: 7 },
  },
  {
    id: "saas",
    code: "ONL-02",
    category: "Онлайн",
    name: "SaaS",
    oneLiner: "Подписочный софт-продукт, доступный через интернет",
    forWhom: "Кто имеет техническую экспертизу и готов к долгому циклу до прибыли",
    notFor: "Кто хочет быстрый возврат вложений и не готов заниматься разработкой",
    how: "Вы разрабатываете программный продукт и продаёте доступ к нему по подписке. Основные затраты — на старте, после запуска предельные издержки на клиента почти нулевые.",
    minCapital: 200000,
    expectedAnnualReturn: 25,
    weeklyHours: 30,
    paybackMonths: 24,
    employeesRequired: 2,
    liquidityScore: 2,
    profitPessimistic: 2083,
    profitRealistic: 4167,
    profitOptimistic: 7500,
    launch: "6–12 месяцев",
    skills: "Разработка или управление разработкой, продуктовое мышление",
    ownerInvolvement: 5,
    volatility: "Высокая",
    risks: ["Product-market fit", "Технологический", "Риск оттока клиентов"],
    scalability: "Очень высокая",
    automation: "Высокая",
    geo: "Полная",
    radar: { Доходность: null, Риск: 7, Сложность: 7, Трудоёмкость: null, Гибкость: 6, Масштаб: 9 },
  },
  {
    id: "consulting-agency",
    code: "ONL-03",
    category: "Онлайн",
    name: "Консалтинговое агентство",
    oneLiner: "Продажа экспертизы и услуг под собственным брендом",
    forWhom: "Кто имеет экспертизу в нише и готов сначала продавать своё время",
    notFor: "Кто хочет пассивный доход без личного вовлечения",
    how: "Вы продаёте консультации, услуги или проекты клиентам, используя свою экспертизу. Доход растёт с ценой часа и числом клиентов, но упирается в личное время, пока не наняты сотрудники.",
    minCapital: 20000,
    expectedAnnualReturn: 12,
    weeklyHours: 30,
    paybackMonths: 6,
    employeesRequired: 0,
    liquidityScore: 2,
    profitPessimistic: 100,
    profitRealistic: 200,
    profitOptimistic: 360,
    launch: "1 месяц",
    skills: "Экспертиза в нише, продажи",
    ownerInvolvement: 8,
    volatility: "Средняя",
    risks: ["Зависимость от основателя", "Рыночный"],
    scalability: "Средняя, через найм",
    automation: "Низкая",
    geo: "Высокая",
    radar: { Доходность: null, Риск: 4, Сложность: 3, Трудоёмкость: null, Гибкость: 6, Масштаб: 4 },
  },
  {
    id: "commercial-re",
    code: "RE-02",
    category: "Недвижимость",
    name: "Коммерческая недвижимость",
    oneLiner: "Сдача в аренду офисных, торговых или складских помещений",
    forWhom: "Кто хочет доходность выше жилой недвижимости и готов к более крупному капиталу",
    notFor: "Кто не готов к длительным периодам простоя между арендаторами",
    how: "Покупка нежилого помещения и сдача его в аренду бизнесу. Доход обычно выше, чем у жилой недвижимости, но зависит от экономической активности в регионе.",
    minCapital: 5000000,
    expectedAnnualReturn: 7,
    weeklyHours: 2,
    paybackMonths: null,
    employeesRequired: 0,
    liquidityScore: 1,
    profitPessimistic: 14583,
    profitRealistic: 29167,
    profitOptimistic: 52500,
    launch: "3–6 месяцев (сделка)",
    skills: "Понимание коммерческого рынка, переговоры",
    ownerInvolvement: 4,
    volatility: "Средняя",
    risks: ["Рыночный", "Риск простоя", "Юридический"],
    scalability: "Низкая",
    automation: "Средняя",
    geo: "Низкая",
    radar: { Доходность: null, Риск: 4, Сложность: 4, Трудоёмкость: null, Гибкость: 3, Масштаб: 3 },
  },
  {
    id: "vending",
    code: "OTH-02",
    category: "Прочее",
    name: "Вендинг",
    oneLiner: "Автоматы по продаже товаров без участия продавца",
    forWhom: "Кто хочет бизнес с низким личным вовлечением после запуска",
    notFor: "Кто хочет высокую доходность на вложенный капитал",
    how: "Вы размещаете автоматы в проходных локациях. Доход строится на трафике места и марже с единицы товара, обслуживание требует периодических визитов.",
    minCapital: 80000,
    expectedAnnualReturn: 10,
    weeklyHours: 6,
    paybackMonths: 20,
    employeesRequired: 0,
    liquidityScore: 2,
    profitPessimistic: 333,
    profitRealistic: 667,
    profitOptimistic: 1200,
    launch: "1–2 месяца",
    skills: "Переговоры с арендодателями локаций, логистика",
    ownerInvolvement: 5,
    volatility: "Средняя",
    risks: ["Рыночный (трафик)", "Операционный (обслуживание, вандализм)"],
    scalability: "Средняя, тиражирование точек",
    automation: "Высокая",
    geo: "Низкая",
    radar: { Доходность: null, Риск: 4, Сложность: 3, Трудоёмкость: null, Гибкость: 5, Масштаб: 6 },
  },
  {
    id: "equipment-rental",
    code: "OTH-03",
    category: "Прочее",
    name: "Аренда оборудования",
    oneLiner: "Сдача в аренду инструментов, техники или оборудования",
    forWhom: "Кто имеет капитал на покупку оборудования и понимает спрос в нише",
    notFor: "Кто не готов к рискам износа и повреждения активов",
    how: "Вы покупаете оборудование (строительное, ивент, промышленное) и сдаёте его в аренду. Доход — арендная плата за вычетом обслуживания и амортизации.",
    minCapital: 250000,
    expectedAnnualReturn: 9,
    weeklyHours: 8,
    paybackMonths: 30,
    employeesRequired: 1,
    liquidityScore: 2,
    profitPessimistic: 938,
    profitRealistic: 1875,
    profitOptimistic: 3375,
    launch: "1–3 месяца",
    skills: "Понимание ниши, логистика, обслуживание техники",
    ownerInvolvement: 4,
    volatility: "Средняя",
    risks: ["Повреждение актива", "Рыночный (спрос)", "Операционный"],
    scalability: "Средняя",
    automation: "Средняя",
    geo: "Низкая",
    radar: { Доходность: null, Риск: 4, Сложность: 3, Трудоёмкость: null, Гибкость: 4, Масштаб: 5 },
  },
  {
    id: "retail-trade",
    code: "ENT-03",
    category: "Предпринимательство",
    name: "Торговля (розничная точка)",
    oneLiner: "Продажа готовых товаров через физическую точку",
    forWhom: "Кто хочет классический малый бизнес с прямым контактом с покупателем",
    notFor: "Кто не готов к аренде помещения и невысокой марже",
    how: "Вы закупаете товар оптом и продаёте его в розницу через магазин. Доход равен торговой марже за вычетом аренды, персонала и закупки.",
    minCapital: 400000,
    expectedAnnualReturn: 8,
    weeklyHours: 30,
    paybackMonths: 24,
    employeesRequired: 3,
    liquidityScore: 2,
    profitPessimistic: 1333,
    profitRealistic: 2667,
    profitOptimistic: 4800,
    launch: "2–4 месяца",
    skills: "Закупки, работа с персоналом, мерчандайзинг",
    ownerInvolvement: 6,
    volatility: "Средняя",
    risks: ["Рыночный", "Операционный", "Риск запасов"],
    scalability: "Средняя",
    automation: "Низкая",
    geo: "Низкая",
    radar: { Доходность: null, Риск: 5, Сложность: 4, Трудоёмкость: null, Гибкость: 3, Масштаб: 4 },
  },
  {
    id: "manufacturing",
    code: "ENT-04",
    category: "Предпринимательство",
    name: "Производство",
    oneLiner: "Изготовление физического товара для продажи оптом или в розницу",
    forWhom: "Кто имеет производственную экспертизу и готов к капиталоёмкому старту",
    notFor: "Кто хочет быстрый и лёгкий запуск",
    how: "Вы организуете производство товара (оборудование, сырьё, персонал) и продаёте продукцию. Доход равен выручке за вычетом сырья, труда и постоянных издержек.",
    minCapital: 1500000,
    expectedAnnualReturn: 14,
    weeklyHours: 35,
    paybackMonths: 36,
    employeesRequired: 12,
    liquidityScore: 1,
    profitPessimistic: 8750,
    profitRealistic: 17500,
    profitOptimistic: 31500,
    launch: "6–12 месяцев",
    skills: "Технологическая экспертиза, управление производством",
    ownerInvolvement: 7,
    volatility: "Средняя",
    risks: ["Операционный", "Рыночный", "Риск сырья и поставок"],
    scalability: "Высокая",
    automation: "Средняя",
    geo: "Низкая",
    radar: { Доходность: null, Риск: 6, Сложность: 8, Трудоёмкость: null, Гибкость: 2, Масштаб: 6 },
  },
  {
    id: "services-studio",
    code: "ENT-05",
    category: "Предпринимательство",
    name: "Услуги (мастерская/студия)",
    oneLiner: "Регулярные услуги через физическую точку — салон, мастерская, студия",
    forWhom: "Кто имеет ремесленный или сервисный навык и хочет свою точку",
    notFor: "Кто хочет пассивный доход без личного участия",
    how: "Вы предоставляете услугу клиентам на месте. Доход равен цене услуги, умноженной на число клиентов, за вычетом аренды и материалов.",
    minCapital: 200000,
    expectedAnnualReturn: 9,
    weeklyHours: 32,
    paybackMonths: 18,
    employeesRequired: 2,
    liquidityScore: 2,
    profitPessimistic: 750,
    profitRealistic: 1500,
    profitOptimistic: 2700,
    launch: "1–3 месяца",
    skills: "Профессиональный навык, работа с клиентами",
    ownerInvolvement: 7,
    volatility: "Средняя",
    risks: ["Рыночный", "Операционный", "Зависимость от мастера"],
    scalability: "Средняя",
    automation: "Низкая",
    geo: "Низкая",
    radar: { Доходность: null, Риск: 4, Сложность: 3, Трудоёмкость: null, Гибкость: 4, Масштаб: 4 },
  },
  {
    id: "youtube",
    code: "ONL-04",
    category: "Онлайн",
    name: "YouTube / контент",
    oneLiner: "Видео- или медиаконтент с монетизацией через рекламу и спонсорство",
    forWhom: "Кто готов долго вкладываться без гарантированного дохода ради охвата",
    notFor: "Кто хочет предсказуемый доход с самого начала",
    how: "Вы создаёте контент на платформе, набираете аудиторию и монетизируете её через рекламу, спонсорство и продажу собственных продуктов. Доход сильно зависит от охвата и алгоритмов платформы.",
    minCapital: 10000,
    expectedAnnualReturn: 15,
    weeklyHours: 20,
    paybackMonths: 18,
    employeesRequired: 0,
    liquidityScore: 3,
    profitPessimistic: 62,
    profitRealistic: 125,
    profitOptimistic: 225,
    launch: "6–18 месяцев до заметного дохода",
    skills: "Контент-производство, маркетинг, постоянство",
    ownerInvolvement: 9,
    volatility: "Очень высокая",
    risks: ["Долгое отсутствие дохода", "Изменение алгоритмов платформы"],
    scalability: "Высокая",
    automation: "Средняя",
    geo: "Полная",
    radar: { Доходность: null, Риск: 8, Сложность: 4, Трудоёмкость: null, Гибкость: 7, Масштаб: 8 },
  },
  {
    id: "mobile-app",
    code: "ONL-05",
    category: "Онлайн",
    name: "Мобильное приложение",
    oneLiner: "Разработка приложения с монетизацией через рекламу, подписку или покупки",
    forWhom: "Кто имеет техническую экспертизу или бюджет на разработку",
    notFor: "Кто хочет быстрый и дешёвый запуск",
    how: "Вы разрабатываете приложение и монетизируете его через рекламу, подписку или встроенные покупки. Затраты сосредоточены на старте, дальнейший рост почти без предельных издержек.",
    minCapital: 300000,
    expectedAnnualReturn: 20,
    weeklyHours: 25,
    paybackMonths: 24,
    employeesRequired: 1,
    liquidityScore: 2,
    profitPessimistic: 2500,
    profitRealistic: 5000,
    profitOptimistic: 9000,
    launch: "6–12 месяцев",
    skills: "Разработка, UX, маркетинг в сторах",
    ownerInvolvement: 5,
    volatility: "Высокая",
    risks: ["Product-market fit", "Технологический", "Конкуренция в сторах"],
    scalability: "Очень высокая",
    automation: "Высокая",
    geo: "Полная",
    radar: { Доходность: null, Риск: 7, Сложность: 7, Трудоёмкость: null, Гибкость: 6, Масштаб: 9 },
  },
  {
    id: "warehouses",
    code: "RE-03",
    category: "Недвижимость",
    name: "Склады",
    oneLiner: "Сдача в аренду складских или логистических помещений",
    forWhom: "Кто хочет стабильный доход от растущего сегмента логистики и e-commerce",
    notFor: "Кто не готов к крупному капиталу и долгосрочным контрактам",
    how: "Покупка или строительство складского помещения и сдача его в аренду бизнесу. Контракты обычно долгосрочные и стабильные.",
    minCapital: 4000000,
    expectedAnnualReturn: 7,
    weeklyHours: 1,
    paybackMonths: null,
    employeesRequired: 0,
    liquidityScore: 1,
    profitPessimistic: 11667,
    profitRealistic: 23333,
    profitOptimistic: 42000,
    launch: "6–12 месяцев",
    skills: "Понимание логистического рынка, переговоры",
    ownerInvolvement: 3,
    volatility: "Низкая–средняя",
    risks: ["Рыночный", "Риск простоя", "Юридический"],
    scalability: "Низкая",
    automation: "Высокая",
    geo: "Низкая",
    radar: { Доходность: null, Риск: 3, Сложность: 5, Трудоёмкость: null, Гибкость: 2, Масштаб: 4 },
  },
  {
    id: "parking",
    code: "RE-04",
    category: "Недвижимость",
    name: "Парковки",
    oneLiner: "Сдача в аренду парковочных мест или организация платной парковки",
    forWhom: "Кто хочет недвижимость с низкими эксплуатационными затратами",
    notFor: "Кто хочет высокую доходность",
    how: "Вы приобретаете или арендуете места под парковку и монетизируете их почасовой или абонентской оплатой. Затраты на обслуживание минимальны.",
    minCapital: 500000,
    expectedAnnualReturn: 5,
    weeklyHours: 1,
    paybackMonths: null,
    employeesRequired: 0,
    liquidityScore: 1,
    profitPessimistic: 1042,
    profitRealistic: 2083,
    profitOptimistic: 3750,
    launch: "2–4 месяца",
    skills: "Понимание локального спроса, базовая автоматизация оплаты",
    ownerInvolvement: 3,
    volatility: "Низкая",
    risks: ["Спрос на локацию", "Юридический"],
    scalability: "Низкая",
    automation: "Высокая",
    geo: "Низкая",
    radar: { Доходность: null, Риск: 2, Сложность: 2, Трудоёмкость: null, Гибкость: 3, Масштаб: 2 },
  },
  {
    id: "short-term-rental",
    code: "RE-05",
    category: "Недвижимость",
    name: "Краткосрочная аренда (посуточно)",
    oneLiner: "Сдача жилья на короткие сроки через платформы вроде Airbnb",
    forWhom: "Кто хочет доходность выше долгосрочной аренды и готов к операционке",
    notFor: "Кто хочет полностью пассивный доход без вовлечения",
    how: "Вы сдаёте квартиру посуточно туристам или командированным. Доходность на объект обычно выше долгосрочной аренды, но требует активного управления — уборка, заселение, отзывы.",
    minCapital: 2000000,
    expectedAnnualReturn: 9,
    weeklyHours: 8,
    paybackMonths: null,
    employeesRequired: 0,
    liquidityScore: 1,
    profitPessimistic: 7500,
    profitRealistic: 15000,
    profitOptimistic: 27000,
    launch: "2–3 месяца",
    skills: "Гостеприимство, управление бронированиями, маркетинг",
    ownerInvolvement: 6,
    volatility: "Средне-высокая, сезонность",
    risks: ["Рыночный", "Регуляторный (ограничения на аренду)", "Операционный"],
    scalability: "Средняя",
    automation: "Средняя, делегируется УК",
    geo: "Низкая",
    radar: { Доходность: null, Риск: 5, Сложность: 4, Трудоёмкость: null, Гибкость: 3, Масштаб: 3 },
  },
  {
    id: "agriculture",
    code: "OTH-04",
    category: "Прочее",
    name: "Сельское хозяйство",
    oneLiner: "Выращивание сельхозпродукции или животноводство для продажи",
    forWhom: "Кто имеет доступ к земле и готов к долгим циклам окупаемости",
    notFor: "Кто хочет быстрый и предсказуемый доход",
    how: "Вы возделываете землю или разводите животных, продавая продукцию оптом, в розницу или по контракту. Доход сильно зависит от урожая, погоды и цен на сырьевых рынках.",
    minCapital: 1000000,
    expectedAnnualReturn: 8,
    weeklyHours: 35,
    paybackMonths: 36,
    employeesRequired: 6,
    liquidityScore: 1,
    profitPessimistic: 3333,
    profitRealistic: 6667,
    profitOptimistic: 12000,
    launch: "6–12 месяцев до первого цикла",
    skills: "Агрономия или животноводство, управление",
    ownerInvolvement: 6,
    volatility: "Высокая (погода, цены на сырьё)",
    risks: ["Погодный/природный", "Рыночный (цены на сырьё)", "Операционный"],
    scalability: "Средняя",
    automation: "Средняя",
    geo: "Низкая",
    radar: { Доходность: null, Риск: 6, Сложность: 6, Трудоёмкость: null, Гибкость: 2, Масштаб: 5 },
  },
  {
    id: "ip-royalties",
    code: "OTH-05",
    category: "Прочее",
    name: "Роялти / интеллектуальная собственность",
    oneLiner: "Создание и лицензирование ИС — музыки, патентов, бренда",
    forWhom: "Кто может создать уникальный актив, который можно лицензировать",
    notFor: "Кто хочет предсказуемый линейный доход",
    how: "Вы создаёте объект интеллектуальной собственности и получаете роялти каждый раз, когда его используют. Доход крайне неравномерный: большинство объектов не приносят почти ничего, немногие — очень много.",
    minCapital: 30000,
    expectedAnnualReturn: 18,
    weeklyHours: 5,
    paybackMonths: null,
    employeesRequired: 0,
    liquidityScore: 4,
    profitPessimistic: 225,
    profitRealistic: 450,
    profitOptimistic: 810,
    launch: "Непредсказуемо, от месяцев до лет",
    skills: "Творческая или изобретательская экспертиза, защита прав",
    ownerInvolvement: 4,
    volatility: "Очень высокая",
    risks: ["Отсутствие спроса", "Юридический (защита прав)", "Копирование"],
    scalability: "Очень высокая",
    automation: "Высокая",
    geo: "Полная",
    radar: { Доходность: null, Риск: 8, Сложность: 5, Трудоёмкость: null, Гибкость: 8, Масштаб: 8 },
  },
];

// Доходность и Трудоёмкость больше не проставляются вручную — они
// вычисляются из атомарных полей (expectedAnnualReturn, weeklyHours) по
// зафиксированным порогам. Новая карточка №26 получит те же баллы, что и
// любая другая, при тех же входных числах — это и есть воспроизводимая rubric.
function returnToScore(pct) {
  if (pct <= 0) return 1;
  if (pct <= 3) return 2;
  if (pct <= 10) return Math.round(3 + ((pct - 3) / 7) * 2);
  if (pct <= 25) return Math.round(6 + ((pct - 10) / 15) * 2);
  return Math.min(10, Math.round(9 + (pct - 25) / 25));
}

function effortToScore(hrs) {
  if (hrs <= 0) return 1;
  if (hrs <= 3) return 2;
  if (hrs <= 15) return Math.round(3 + ((hrs - 3) / 12) * 3);
  if (hrs <= 30) return Math.round(6 + ((hrs - 15) / 15) * 2);
  return Math.min(10, Math.round(9 + (hrs - 30) / 10));
}

CARDS.forEach((card) => {
  card.radar.Доходность = returnToScore(card.expectedAnnualReturn);
  card.radar.Трудоёмкость = effortToScore(card.weeklyHours);
  card.passiveIncome = card.weeklyHours <= 3;
});

const CATEGORY_COLOR = {
  Инвестиции: "#7FB3C9",
  Предпринимательство: "#D9A44D",
  Прочее: "#C98A6B",
  Недвижимость: "#8FA37E",
  Онлайн: "#B08FC9",
};

function useGoogleFonts() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Newsreader:ital,wght@0,400;0,500;1,400&family=JetBrains+Mono:wght@400;500&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);
}

function MethodologyNote() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ padding: "10px 8px 12px 8px" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          background: "none",
          border: "none",
          color: "#5C6270",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          cursor: "pointer",
          padding: 0,
          textDecoration: "underline",
        }}
      >
        {open ? "скрыть методику баллов" : "как считаются баллы?"}
      </button>
      {open && (
        <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
          {Object.entries(SCORING_RUBRIC).map(([axis, rule]) => (
            <div key={axis} style={{ fontFamily: "'Newsreader', serif", fontSize: 12, color: "#8B92A0", lineHeight: 1.4 }}>
              <span style={{ color: "#B7BCC7", fontWeight: 600 }}>{axis}: </span>
              {rule}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MiniGauge({ value }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div
        style={{
          width: 46,
          height: 4,
          background: "#2A2F3A",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${value * 10}%`,
            height: "100%",
            background: "#D9A44D",
          }}
        />
      </div>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#8B92A0" }}>
        {value}/10
      </span>
    </div>
  );
}

function CardTile({ card, onSelect, reasons, matchPercent, compareSelected, onToggleCompare }) {
  const color = CATEGORY_COLOR[card.category] || "#D9A44D";
  const locked = reasons.length > 0;
  const matchColor = matchPercent >= 90 ? "#8FA37E" : matchPercent >= 60 ? "#D9A44D" : "#C97B7B";
  return (
    <div
      onClick={() => !locked && onSelect(card.id)}
      style={{
        textAlign: "left",
        background: "#1C2029",
        border: `1px solid ${compareSelected ? "#D9A44D" : locked ? "#22262F" : "#2A2F3A"}`,
        borderRadius: 10,
        padding: "16px 18px",
        cursor: locked ? "not-allowed" : "pointer",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        opacity: locked ? 0.4 : 1,
        transition: "border-color 0.15s ease, opacity 0.15s ease",
        position: "relative",
      }}
      onMouseEnter={(e) => !locked && (e.currentTarget.style.borderColor = compareSelected ? "#D9A44D" : color)}
      onMouseLeave={(e) => !locked && (e.currentTarget.style.borderColor = compareSelected ? "#D9A44D" : "#2A2F3A")}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.08em",
            color,
          }}
        >
          {card.code}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {onToggleCompare && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare(card.id);
              }}
              style={{
                background: compareSelected ? "#D9A44D" : "#22262F",
                color: compareSelected ? "#14171C" : "#8B92A0",
                border: "none",
                borderRadius: 5,
                padding: "2px 7px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                cursor: "pointer",
              }}
            >
              {compareSelected ? "✓ сравнить" : "+ сравнить"}
            </button>
          )}
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: "#8B92A0",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            {card.category}
          </span>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 12,
              fontWeight: 700,
              color: matchColor,
              background: "#14171C",
              border: `1px solid ${matchColor}`,
              borderRadius: 5,
              padding: "1px 7px",
            }}
          >
            {matchPercent}%
          </span>
        </div>
      </div>
      <h3
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 19,
          fontWeight: 600,
          color: "#ECE9E2",
          margin: 0,
        }}
      >
        {card.name}
      </h3>
      <p
        style={{
          fontFamily: "'Newsreader', serif",
          fontSize: 14,
          color: "#B7BCC7",
          margin: 0,
          lineHeight: 1.5,
        }}
      >
        {card.oneLiner}
      </p>
      <div style={{ display: "flex", gap: 18, marginTop: 4, flexWrap: "wrap", alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "#5C6270", textTransform: "uppercase" }}>
            Доходность
          </div>
          <MiniGauge value={card.radar.Доходность} />
        </div>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "#5C6270", textTransform: "uppercase" }}>
            Риск
          </div>
          <MiniGauge value={card.radar.Риск} />
        </div>
        {locked && (
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: 6,
              flexWrap: "wrap",
              justifyContent: "flex-end",
            }}
          >
            {reasons.map((r) => (
              <span
                key={r}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: "#C97B7B",
                  background: "#241E1E",
                  border: "1px solid #3A2A2A",
                  borderRadius: 5,
                  padding: "2px 6px",
                }}
              >
                <Lock size={10} /> {r}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function formatCzk(value) {
  if (value >= 1000000) return `${(value / 1000000).toFixed(value % 1000000 === 0 ? 0 : 1)} млн Kč`;
  if (value >= 1000) return `${Math.round(value / 1000)} тис. Kč`;
  return `${value} Kč`;
}

// Единственный источник правды по капиталу — minCapital (число).
// Лейбл больше не хранится вручную в карточке, а вычисляется по порогам,
// чтобы не поддерживать два независимых поля, которые могут разойтись.
function getCapitalLabel(minCapital) {
  if (minCapital < 10000) return "Низкий";
  if (minCapital < 100000) return "Низкий–средний";
  if (minCapital < 500000) return "Средний";
  if (minCapital < 2000000) return "Средний–высокий";
  return "Высокий";
}

function getLiquidityLabel(score) {
  if (score >= 8) return "Высокая";
  if (score >= 6) return "Средняя–высокая";
  if (score >= 4) return "Средняя";
  if (score >= 2) return "Низкая";
  return "Очень низкая";
}

// Методика присвоения баллов 1–10 по каждой оси radar.
// Доходность и Трудоёмкость вычисляются автоматически из атомарных полей
// (expectedAnnualReturn, weeklyHours) — см. returnToScore/effortToScore.
// Остальные оси пока проставляются экспертно по этим правилам вручную —
// это честно задокументированное ограничение, а не скрытая субъективность.
const SCORING_RUBRIC = {
  Доходность: "вычисляется из expectedAnnualReturn (%): 1–2 = 0–3%, 3–5 = 3–10%, 6–8 = 10–25%, 9–10 = 25%+",
  Риск: "1–10 по вероятности частичной/полной потери капитала и волатильности результата (проставляется вручную)",
  Сложность: "1–10 по количеству требуемых компетенций для старта и ведения (проставляется вручную)",
  Трудоёмкость: "вычисляется из weeklyHours: 1–2 = 0ч, 3–6 = 3–15ч, 6–8 = 15–30ч, 9–10 = 30ч+",
  Гибкость: "1–10 по скорости и лёгкости выхода/смены направления без потери капитала (проставляется вручную)",
  Масштаб: "1–10 по способности роста выручки без пропорционального роста затрат/времени (проставляется вручную)",
};

function DetailView({ card, onBack }) {
  const color = CATEGORY_COLOR[card.category] || "#D9A44D";
  const radarData = Object.entries(card.radar).map(([key, value]) => ({
    axis: key,
    value,
    full: 10,
  }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <button
        onClick={onBack}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: "none",
          border: "none",
          color: "#8B92A0",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          cursor: "pointer",
          padding: 0,
          alignSelf: "flex-start",
        }}
      >
        <ArrowLeft size={14} /> назад к каталогу
      </button>

      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              letterSpacing: "0.08em",
              color,
            }}
          >
            {card.code}
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: "#8B92A0",
              textTransform: "uppercase",
            }}
          >
            {card.category}
          </span>
        </div>
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 32,
            fontWeight: 700,
            color: "#ECE9E2",
            margin: "0 0 8px 0",
          }}
        >
          {card.name}
        </h1>
        <p
          style={{
            fontFamily: "'Newsreader', serif",
            fontStyle: "italic",
            fontSize: 17,
            color: "#B7BCC7",
            margin: 0,
          }}
        >
          {card.oneLiner}
        </p>
      </div>

      {/* Radar */}
      <div
        style={{
          background: "#1C2029",
          border: "1px solid #2A2F3A",
          borderRadius: 12,
          padding: "8px 8px 0 8px",
        }}
      >
        <ResponsiveContainer width="100%" height={280}>
          <RadarChart data={radarData} outerRadius="72%">
            <PolarGrid stroke="#2A2F3A" />
            <PolarAngleAxis
              dataKey="axis"
              tick={{ fill: "#B7BCC7", fontFamily: "JetBrains Mono", fontSize: 11 }}
            />
            <Radar
              dataKey="value"
              stroke={color}
              fill={color}
              fillOpacity={0.28}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
        <MethodologyNote />
      </div>

      {/* Two-column meta */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <MetaBlock label="Кому подходит" value={card.forWhom} />
        <MetaBlock label="Кому не подходит" value={card.notFor} />
      </div>

      <Section title="Как это работает">
        <p style={{ fontFamily: "'Newsreader', serif", fontSize: 15, color: "#D8D5CC", lineHeight: 1.6, margin: 0 }}>
          {card.how}
        </p>
      </Section>

      <Section title="Профиль ресурсов">
        <StatRow label="Стартовый капитал" value={`${getCapitalLabel(card.minCapital)} · от ${formatCzk(card.minCapital)}`} />
        <StatRow label="Срок запуска" value={card.launch} />
        <StatRow label="Навыки" value={card.skills} />
        <StatRow label="Нужны сотрудники" value={card.employeesRequired === 0 ? "Нет" : `от ${card.employeesRequired}`} />
      </Section>

      <Section title="Экономика">
        <StatRow label="Ожидаемая годовая доходность" value={`~${card.expectedAnnualReturn}%`} />
        <StatRow label="Часов в неделю" value={card.weeklyHours === 0 ? "Не требуется" : `~${card.weeklyHours}ч`} />
        <StatRow label="Срок окупаемости" value={card.paybackMonths === null ? "Не применимо (мгновенная ликвидность)" : `~${card.paybackMonths} мес.`} />
        <StatRow
          label="Прибыль в месяц при мин. капитале"
          value={`${formatCzk(card.profitPessimistic)} / ${formatCzk(card.profitRealistic)} / ${formatCzk(card.profitOptimistic)}`}
        />
        <StatRow label="Пассивный доход" value={card.passiveIncome ? "Да" : "Нет"} />
      </Section>

      <Section title="Риск и предсказуемость">
        <StatRow
          label="Вовлечённость владельца"
          value={<MiniGauge value={card.ownerInvolvement} />}
        />
        <StatRow label="Волатильность результата" value={card.volatility} />
        <StatRow label="Типы риска" value={card.risks.join(" · ")} />
      </Section>

      <Section title="Потенциал">
        <StatRow label="Масштабируемость" value={card.scalability} />
        <StatRow label="Автоматизация" value={card.automation} />
        <StatRow label="Ликвидность" value={`${getLiquidityLabel(card.liquidityScore)} · ${card.liquidityScore}/10`} />
        <StatRow label="Географическая независимость" value={card.geo} />
      </Section>
    </div>
  );
}

function MetaBlock({ label, value }) {
  return (
    <div
      style={{
        background: "#1C2029",
        border: "1px solid #2A2F3A",
        borderRadius: 10,
        padding: "14px 16px",
      }}
    >
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          color: "#5C6270",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <div style={{ fontFamily: "'Newsreader', serif", fontSize: 14, color: "#D8D5CC", lineHeight: 1.5 }}>
        {value}
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: "#8B92A0",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: 10,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <Gauge size={12} /> {title}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{children}</div>
    </div>
  );
}

function StatRow({ label, value }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #22262F",
        paddingBottom: 8,
        gap: 12,
      }}
    >
      <span style={{ fontFamily: "'Newsreader', serif", fontSize: 14, color: "#8B92A0" }}>
        {label}
      </span>
      <span style={{ fontFamily: "'Newsreader', serif", fontSize: 14, color: "#ECE9E2", textAlign: "right" }}>
        {value}
      </span>
    </div>
  );
}

const PRESETS = [
  { label: "10 тис.", value: 10000 },
  { label: "100 тис.", value: 100000 },
  { label: "500 тис.", value: 500000 },
  { label: "2 млн +", value: 5000000 },
];

function SliderRow({ label, valueLabel, value, min, max, step, onChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: "#8B92A0",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {label}
        </span>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, color: "#D9A44D" }}>
          {valueLabel}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: "#D9A44D" }}
      />
    </div>
  );
}

const ALL_CATEGORIES = ["Инвестиции", "Предпринимательство", "Онлайн", "Недвижимость", "Прочее"];

function CategoryChips({ activeCategories, toggleCategory }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: "#8B92A0",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        Категория
      </span>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {ALL_CATEGORIES.map((cat) => {
          const active = activeCategories.includes(cat);
          const color = CATEGORY_COLOR[cat] || "#D9A44D";
          return (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              style={{
                background: active ? color : "#22262F",
                color: active ? "#14171C" : "#B7BCC7",
                border: `1px solid ${active ? color : "#2A2F3A"}`,
                borderRadius: 6,
                padding: "5px 10px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                cursor: "pointer",
                transition: "all 0.12s ease",
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FilterPanel({
  budget,
  setBudget,
  maxRisk,
  setMaxRisk,
  maxEffort,
  setMaxEffort,
  activeCategories,
  toggleCategory,
  searchQuery,
  setSearchQuery,
  visibleCount,
  totalCount,
}) {
  return (
    <div
      style={{
        background: "#1C2029",
        border: "1px solid #2A2F3A",
        borderRadius: 10,
        padding: "16px 18px",
        marginBottom: 20,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: "#8B92A0",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        <SlidersHorizontal size={12} /> Настройки поиска
      </div>

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Поиск по названию — например, «франшиза»"
        style={{
          width: "100%",
          boxSizing: "border-box",
          background: "#14171C",
          border: "1px solid #2A2F3A",
          borderRadius: 6,
          padding: "8px 10px",
          color: "#ECE9E2",
          fontFamily: "'Newsreader', serif",
          fontSize: 14,
          outline: "none",
        }}
      />

      <CategoryChips activeCategories={activeCategories} toggleCategory={toggleCategory} />

      <SliderRow
        label="Капитал"
        valueLabel={`до ${formatCzk(budget)}`}
        value={budget}
        min={1000}
        max={5000000}
        step={1000}
        onChange={setBudget}
      />

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: -8 }}>
        {PRESETS.map((p) => (
          <button
            key={p.label}
            onClick={() => setBudget(p.value)}
            style={{
              background: budget === p.value ? "#D9A44D" : "#22262F",
              color: budget === p.value ? "#14171C" : "#B7BCC7",
              border: "none",
              borderRadius: 6,
              padding: "5px 10px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              cursor: "pointer",
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      <SliderRow
        label="Максимальный риск"
        valueLabel={`≤ ${maxRisk}/10`}
        value={maxRisk}
        min={1}
        max={10}
        step={1}
        onChange={setMaxRisk}
      />

      <SliderRow
        label="Максимальная вовлечённость"
        valueLabel={`≤ ${maxEffort}/10`}
        value={maxEffort}
        min={1}
        max={10}
        step={1}
        onChange={setMaxEffort}
      />

      <div style={{ fontFamily: "'Newsreader', serif", fontSize: 13, color: "#5C6270" }}>
        Подходит {visibleCount} из {totalCount} вариантов при таких параметрах
      </div>
    </div>
  );
}

function SortToggle({ sortMode, setSortMode }) {
  const options = [
    { key: "match", label: "% совпадения" },
    { key: "return", label: "Доходность" },
    { key: "risk", label: "Риск (безопасные сначала)" },
  ];
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          color: "#5C6270",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        Сортировка:
      </span>
      {options.map((o) => (
        <button
          key={o.key}
          onClick={() => setSortMode(o.key)}
          style={{
            background: sortMode === o.key ? "#D9A44D" : "#22262F",
            color: sortMode === o.key ? "#14171C" : "#B7BCC7",
            border: "none",
            borderRadius: 6,
            padding: "5px 10px",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            cursor: "pointer",
          }}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function ComparisonView({ cards, onBack, onClear }) {
  if (cards.length < 2) return null;
  const axes = Object.keys(cards[0].radar);
  const gridCols = `140px repeat(${cards.length}, minmax(96px, 1fr))`;

  const rows = [
    ["Категория", (c) => c.category],
    ["Стартовый капитал", (c) => `${getCapitalLabel(c.minCapital)} · ${formatCzk(c.minCapital)}`],
    ["Срок запуска", (c) => c.launch],
    ["Волатильность", (c) => c.volatility],
    ["Вовлечённость владельца", (c) => `${c.ownerInvolvement}/10`],
    ["Ожидаемая доходность", (c) => `~${c.expectedAnnualReturn}%`],
    ["Часов в неделю", (c) => c.weeklyHours],
    ["Срок окупаемости", (c) => (c.paybackMonths === null ? "не применимо" : `~${c.paybackMonths} мес.`)],
    ["Ликвидность", (c) => `${getLiquidityLabel(c.liquidityScore)} · ${c.liquidityScore}/10`],
    ["Масштабируемость", (c) => c.scalability],
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <button
        onClick={onBack}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: "none",
          border: "none",
          color: "#8B92A0",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          cursor: "pointer",
          padding: 0,
          alignSelf: "flex-start",
        }}
      >
        <ArrowLeft size={14} /> назад к каталогу
      </button>

      <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 700, color: "#ECE9E2", margin: 0 }}>
        Сравнение ({cards.length})
      </h1>

      <div style={{ overflowX: "auto", paddingBottom: 4 }}>
        <div style={{ minWidth: 140 + cards.length * 100 }}>
          {/* Заголовки карточек */}
          <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: 8, marginBottom: 12 }}>
            <div />
            {cards.map((card) => {
              const color = CATEGORY_COLOR[card.category] || "#D9A44D";
              return (
                <div key={card.id} style={{ background: "#1C2029", border: `1px solid ${color}`, borderRadius: 10, padding: "10px 10px" }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color, marginBottom: 4 }}>{card.code}</div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: "#ECE9E2", lineHeight: 1.25 }}>
                    {card.name}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Оси radar */}
          <div style={{ background: "#1C2029", border: "1px solid #2A2F3A", borderRadius: 10, padding: "14px 12px", display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#5C6270", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Профиль по осям
            </div>
            {axes.map((axis) => (
              <div key={axis} style={{ display: "grid", gridTemplateColumns: gridCols, gap: 8, alignItems: "center" }}>
                <span style={{ fontFamily: "'Newsreader', serif", fontSize: 13, color: "#8B92A0" }}>{axis}</span>
                {cards.map((card) => (
                  <MiniGauge key={card.id} value={card.radar[axis]} />
                ))}
              </div>
            ))}
          </div>

          {/* Остальные параметры */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {rows.map(([label, getValue]) => (
              <div key={label} style={{ display: "grid", gridTemplateColumns: gridCols, gap: 8, borderBottom: "1px solid #22262F", paddingBottom: 8 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#5C6270" }}>{label}</span>
                {cards.map((card) => (
                  <span key={card.id} style={{ fontFamily: "'Newsreader', serif", fontSize: 13, color: "#D8D5CC" }}>
                    {getValue(card)}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={onClear}
        style={{
          background: "#22262F",
          color: "#B7BCC7",
          border: "none",
          borderRadius: 6,
          padding: "8px 14px",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          cursor: "pointer",
          alignSelf: "flex-start",
        }}
      >
        Очистить выбор
      </button>
    </div>
  );
}

export default function CapitalCatalog() {
  useGoogleFonts();
  const [selectedId, setSelectedId] = useState(null);
  const [budget, setBudget] = useState(5000000);
  const [maxRisk, setMaxRisk] = useState(10);
  const [maxEffort, setMaxEffort] = useState(10);
  const [activeCategories, setActiveCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortMode, setSortMode] = useState("match");
  const [compareIds, setCompareIds] = useState([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const selected = CARDS.find((c) => c.id === selectedId);

  const toggleCategory = (cat) => {
    setActiveCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleCompare = (id) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((c) => c !== id);
      if (prev.length >= 5) return prev; // сравниваем максимум пять вариантов за раз
      return [...prev, id];
    });
  };

  const reasonsFor = (card) => {
    const reasons = [];
    if (activeCategories.length > 0 && !activeCategories.includes(card.category)) {
      reasons.push("другая категория");
    }
    if (card.minCapital > budget) reasons.push(`от ${formatCzk(card.minCapital)}`);
    if (card.radar.Риск > maxRisk) reasons.push(`риск ${card.radar.Риск}/10`);
    if (card.radar.Трудоёмкость > maxEffort) reasons.push(`вовлечённость ${card.radar.Трудоёмкость}/10`);
    return reasons;
  };

  // Частичное соответствие по каждой оси, а не только да/нет — так карточка
  // прямо у порога получает высокий %, а не тот же "провал", что и вариант,
  // который вообще не подходит.
  const matchPercentFor = (card) => {
    const categoryScore =
      activeCategories.length === 0 || activeCategories.includes(card.category) ? 1 : 0;
    const capitalScore = card.minCapital <= budget ? 1 : Math.max(0, budget / card.minCapital);
    const riskScore = card.radar.Риск <= maxRisk ? 1 : Math.max(0, maxRisk / card.radar.Риск);
    const effortScore =
      card.radar.Трудоёмкость <= maxEffort ? 1 : Math.max(0, maxEffort / card.radar.Трудоёмкость);
    const avg = (categoryScore + capitalScore + riskScore + effortScore) / 4;
    return Math.round(avg * 100);
  };

  const searchedCards = CARDS.filter((c) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return c.name.toLowerCase().includes(q) || c.oneLiner.toLowerCase().includes(q);
  });

  const visibleCount = searchedCards.filter((c) => reasonsFor(c).length === 0).length;

  const sortedCards = [...searchedCards]
    .map((card) => ({ card, reasons: reasonsFor(card), matchPercent: matchPercentFor(card) }))
    .sort((a, b) => {
      if (sortMode === "return") return b.card.radar.Доходность - a.card.radar.Доходность;
      if (sortMode === "risk") return a.card.radar.Риск - b.card.radar.Риск;
      return b.matchPercent - a.matchPercent;
    });

  const compareCards = CARDS.filter((c) => compareIds.includes(c.id));

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#14171C",
        padding: "28px 20px 80px 20px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        {!selected && !compareOpen && (
          <>
            <div style={{ marginBottom: 28 }}>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: "#D9A44D",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Каталог способов использования капитала
              </div>
              <h1
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 26,
                  fontWeight: 700,
                  color: "#ECE9E2",
                  margin: "0 0 8px 0",
                }}
              >
                Что вообще есть
              </h1>
              <p
                style={{
                  fontFamily: "'Newsreader', serif",
                  fontSize: 15,
                  color: "#8B92A0",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                Двадцать пять карточек-профилей — по пять архетипов в каждой из пяти категорий — по единой системе координат.
                Нажмите на карточку, чтобы увидеть полный профиль, или отметьте до двух вариантов для сравнения.
              </p>
            </div>
            <FilterPanel
              budget={budget}
              setBudget={setBudget}
              maxRisk={maxRisk}
              setMaxRisk={setMaxRisk}
              maxEffort={maxEffort}
              setMaxEffort={setMaxEffort}
              activeCategories={activeCategories}
              toggleCategory={toggleCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              visibleCount={visibleCount}
              totalCount={CARDS.length}
            />

            <SortToggle sortMode={sortMode} setSortMode={setSortMode} />

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
              {sortedCards.map(({ card, reasons, matchPercent }) => (
                <CardTile
                  key={card.id}
                  card={card}
                  onSelect={setSelectedId}
                  reasons={reasons}
                  matchPercent={matchPercent}
                  compareSelected={compareIds.includes(card.id)}
                  onToggleCompare={toggleCompare}
                />
              ))}
            </div>
          </>
        )}

        {!selected && compareOpen && (
          <ComparisonView
            cards={compareCards}
            onBack={() => setCompareOpen(false)}
            onClear={() => {
              setCompareIds([]);
              setCompareOpen(false);
            }}
          />
        )}

        {selected && <DetailView card={selected} onBack={() => setSelectedId(null)} />}
      </div>

      {!selected && !compareOpen && compareIds.length > 0 && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            background: "#1C2029",
            borderTop: "1px solid #2A2F3A",
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <span style={{ fontFamily: "'Newsreader', serif", fontSize: 13, color: "#B7BCC7" }}>
            Выбрано для сравнения: {compareIds.length}/5
          </span>
          <button
            onClick={() => setCompareOpen(true)}
            disabled={compareIds.length < 2}
            style={{
              background: compareIds.length >= 2 ? "#D9A44D" : "#2A2F3A",
              color: compareIds.length >= 2 ? "#14171C" : "#5C6270",
              border: "none",
              borderRadius: 6,
              padding: "6px 14px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              cursor: compareIds.length >= 2 ? "pointer" : "not-allowed",
            }}
          >
            Сравнить
          </button>
          <button
            onClick={() => setCompareIds([])}
            style={{
              background: "none",
              border: "none",
              color: "#5C6270",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            Сбросить
          </button>
        </div>
      )}
    </div>
  );
}
