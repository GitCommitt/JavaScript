(window.webpackJsonp = window.webpackJsonp || []).push([[23], {
    126: function(e, n, t) {
        "use strict";
        (function(e, i) {
            t.d(n, "a", (function() {
                return r
            }
            ));
            var a = t(97)
              , r = function() {
                function n(e, n, t, i) {
                    this.$q = e,
                    this.$http = n,
                    this.currentUser = t,
                    this.schoolConfiguratieService = i,
                    this.htmlEncode = function(e) {
                        return e.replace(/\+/g, "%2B")
                    }
                }
                return n.prototype.isAdditionalAppointmentsEnabled = function() {
                    var e = this.$q.defer();
                    return this.$http.get("".concat(globalSettings.calendarHostname, "/api/user/").concat(this.currentUser.relatedPersons.current.accountExterneId, "/features"), {
                        cache: !0
                    }).then((function(n) {
                        var t;
                        e.resolve(null === (t = null == n ? void 0 : n.data) || void 0 === t ? void 0 : t.isAdditionalAppointmentsEnabled)
                    }
                    )),
                    e.promise
                }
                ,
                n.prototype.getAdditionalAppointments = function(e, n) {
                    var t = this
                      , i = this.$q.defer();
                    return this.schoolConfiguratieService.getSchoolinformatie().then((function(a) {
                        var r = t.setupDates(e, n)
                          , s = r.startDate
                          , o = r.endDate
                          , c = t.toIsoString(s, a.IANATijdZoneNaam)
                          , l = t.toIsoString(o, a.IANATijdZoneNaam);
                        t.$http.get(t.htmlEncode("".concat(globalSettings.calendarHostname, "/api/user/").concat(t.currentUser.relatedPersons.current.accountExterneId, "/additional-appointments?start=").concat(c, "&end=").concat(l))).then((function(e) {
                            i.resolve(t.mapToViewModels(null == e ? void 0 : e.data))
                        }
                        ))
                    }
                    )),
                    i.promise
                }
                ,
                n.prototype.initAdditionalAppointmentsComponent = function() {
                    this.isAdditionalAppointmentsEnabled().then((function(e) {
                        e && (customElements.get("calendar-additional-appointment-enrollment") || import("".concat(globalSettings.calendarHostname, "/webcomponents/calendar/additional-appointments/additional-appointments.esm.").concat("js")),
                        navigator.serviceWorker.getRegistration().then((function(e) {
                            e.active && !navigator.serviceWorker.controller && window.location.reload()
                        }
                        )))
                    }
                    ))
                }
                ,
                n.prototype.getByDay = function(n, t) {
                    var i = e(t)
                      , a = e(t).add(1, "days");
                    return n.filter((function(n) {
                        var t = e(n.start)
                          , r = e(n.end);
                        return t >= i && t < a || r > i && r <= a || t < i && r > a
                    }
                    ))
                }
                ,
                n.prototype.removeNotEnrollableAdditionalAppointmentsWhenApplicable = function(e, n, t) {
                    if (void 0 === n && (n = !1),
                    void 0 === t && (t = !1),
                    !e.some((function(e) {
                        return e.isAdditionalAppointment
                    }
                    )))
                        return e;
                    if (!t && n)
                        return e.filter((function(e) {
                            return !e.isAdditionalAppointment
                        }
                        ));
                    if (t && n && e.every((function(e) {
                        return e.isAdditionalAppointment
                    }
                    )))
                        return e;
                    var r = i.groupBy(e, (function(e) {
                        return +e.begin
                    }
                    ));
                    for (var s in r) {
                        var o = r[s];
                        o.length > 1 && !t && o.some((function(e) {
                            return [a.c.Algemeen, a.c.Les, a.c.Kwt].includes(e.afspraakType)
                        }
                        )) && o.some((function(e) {
                            return e.isNotEnrollable
                        }
                        )) && (r[s] = o.filter((function(e) {
                            return !e.isNotEnrollable
                        }
                        ))),
                        t && n && (o.every((function(e) {
                            return e.isAdditionalAppointment
                        }
                        )) ? delete r[s] : r[s] = o.filter((function(e) {
                            return !e.isNotEnrolled && !e.isEnrolled
                        }
                        )))
                    }
                    return i.flatten(Object.values(r))
                }
                ,
                n.prototype.sortAgendaData = function(e) {
                    e.some((function(e) {
                        return e.isAdditionalAppointment
                    }
                    )) && e.sort((function(e, n) {
                        return +e.begin == +n.begin ? n.id - e.id : +e.begin - +n.begin
                    }
                    ))
                }
                ,
                n.prototype.setupDates = function(n, t) {
                    var i = e(n)
                      , a = e(t);
                    return i.hours(0),
                    -1 === i.diff(a, "days") && a.add("days", -1),
                    a.add("days", 1).hours(0),
                    {
                        startDate: i.toDate(),
                        endDate: a.toDate()
                    }
                }
                ,
                n.prototype.toIsoString = function(e, n) {
                    var t = this.getTimezoneOffset(n, e)
                      , i = function(e) {
                        return (e < 10 ? "0" : "") + e
                    };
                    return "".concat(e.getFullYear(), "-").concat(i(e.getMonth() + 1), "-").concat(i(e.getDate()), "T").concat(i(e.getHours()), ":").concat(i(e.getMinutes()), ":").concat(i(e.getSeconds())).concat(t)
                }
                ,
                n.prototype.mapToViewModels = function(n) {
                    if (!(null == n ? void 0 : n.length))
                        return [];
                    this.processAdditionalAppointments(n);
                    for (var t = [], i = 0; i < n.length; i++) {
                        var r = n[i]
                          , s = r.participants.find((function(e) {
                            return e.type === a.f.Pupil
                        }
                        ))
                          , o = {
                            id: -1e3 - i,
                            groupingId: r.groupingId,
                            title: "Keuzemoment",
                            begin: e(r.start),
                            einde: e(r.end),
                            start: new Date(r.start),
                            end: new Date(r.end),
                            datumBegin: e(r.start).startOf("day").toDate(),
                            timeSlot: this.buildTimeSlotString(r.startTimeSlot, r.endTimeSlot),
                            isAdditionalAppointment: !0,
                            isEnrolled: (null == s ? void 0 : s.status) === a.e.Accepted && (null == s ? void 0 : s.role) === a.d.Optional,
                            isNotEnrolled: (null == s ? void 0 : s.status) === a.e.Tentative,
                            isNotEnrollable: (null == s ? void 0 : s.status) === a.e.Declined || (null == s ? void 0 : s.status) === a.e.Accepted && (null == s ? void 0 : s.role) === a.d.Required
                        };
                        t.push(o)
                    }
                    return t
                }
                ,
                n.prototype.processAdditionalAppointments = function(e) {
                    var n = i.groupBy(e, "groupingId");
                    e.length = 0;
                    for (var t = 0, a = Object.values(n); t < a.length; t++) {
                        var r = a[t];
                        this.sortByStatus(r);
                        var s = r[0]
                          , o = r.map((function(e) {
                            return e.startTimeSlot
                        }
                        )).filter(Boolean)
                          , c = r.map((function(e) {
                            return e.endTimeSlot
                        }
                        )).filter(Boolean);
                        s.startTimeSlot = o.length > 0 ? Math.min.apply(Math, o) : void 0,
                        s.endTimeSlot = c.length > 0 ? Math.max.apply(Math, c) : void 0,
                        s.start = r.reduce((function(e, n) {
                            return new Date(n.start) < new Date(e.start) ? n : e
                        }
                        ), r[0]).start,
                        s.end = r.reduce((function(e, n) {
                            return new Date(n.end) > new Date(e.end) ? n : e
                        }
                        ), r[0]).end,
                        e.push(s)
                    }
                }
                ,
                n.prototype.sortByStatus = function(e) {
                    e.sort((function(e, n) {
                        var t, i = e.participants.find((function(e) {
                            return e.type === a.f.Pupil
                        }
                        )), r = n.participants.find((function(e) {
                            return e.type === a.f.Pupil
                        }
                        ));
                        if (!i && !r)
                            return 0;
                        var s = ((t = {})[a.e.Accepted] = 1,
                        t[a.e.Tentative] = 2,
                        t[a.e.Declined] = 3,
                        t)
                          , o = s[i.status] - s[r.status];
                        return 0 !== o ? o : 0
                    }
                    ))
                }
                ,
                n.prototype.buildTimeSlotString = function(e, n) {
                    return e && n ? e === n ? e.toString() : "".concat(e, "-").concat(n) : ""
                }
                ,
                n.prototype.getTimezoneOffset = function(e, n) {
                    var t;
                    void 0 === n && (n = new Date),
                    ["en", "fr"].some((function(i) {
                        var a = new Intl.DateTimeFormat(i,{
                            minute: "numeric",
                            timeZone: e,
                            timeZoneName: "short"
                        }).formatToParts(n).filter((function(e) {
                            return "timeZoneName" == e.type && e.value
                        }
                        ));
                        if (/^(GMT|UTC)/.test(a[0].value))
                            return t = a[0].value.replace(/GMT|UTC/, "") || "+0",
                            !0
                    }
                    ));
                    var i = t.startsWith("+") ? "+" : "-"
                      , a = t.substring(1).split(":")
                      , r = a[0]
                      , s = a[1];
                    return "".concat(i).concat(r.padStart(2, "0"), ":").concat(s || "00")
                }
                ,
                n.$inject = ["$q", "$http", "currentUser", "schoolConfiguratieService", n],
                n
            }()
        }
        ).call(this, t(16), t(4))
    },
    127: function(e, n, t) {
        "use strict";
        t.d(n, "a", (function() {
            return a
        }
        ));
        var i = Contracts.Agenda.Afspraken.Enums.AfspraakInfoType
          , a = function() {
            function e() {}
            return e.prototype.toetsTypeOmschrijving = function() {
                return function(e) {
                    switch (e) {
                    case i.Proefwerk:
                        return "Proefwerk";
                    case i.Tentamen:
                        return "Tentamen";
                    case i.SchriftelijkeOverhoring:
                        return "SO";
                    case i.MondelingeOverhoring:
                        return "MO";
                    default:
                        return "onbekend"
                    }
                }
            }
            ,
            e.prototype.afspraakStatus = function() {
                return function(e) {
                    var n = "";
                    return e && (e.isWijziging && (n = "alert"),
                    (e.afspraakType === Contracts.Agenda.Afspraken.Enums.AfspraakType.Les || e.afspraakType === Contracts.Agenda.Afspraken.Enums.AfspraakType.Algemeen || e.afspraakType === Contracts.Agenda.Afspraken.Enums.AfspraakType.Kwt) && e.id < 0 && (n += " alertRed")),
                    n
                }
            }
            ,
            e
        }()
    },
    654: function(e, n, t) {
        "use strict";
        t.r(n),
        function(e) {
            t.d(n, "vandaagAMD", (function() {
                return g
            }
            ));
            var i = t(127)
              , a = t(655)
              , r = t(657)
              , s = t(659)
              , o = t(661)
              , c = t(663)
              , l = t(665)
              , d = t(667)
              , p = t(126)
              , g = e.module("VandaagAMD", []);
            g.service("additionalAppointmentsService", p.a.$inject),
            g.directive("cijfersLeerling", a.a.$inject).directive("notificatieWidget", r.a.$inject).directive("smCijfersOuderInstellingen", s.a).directive("agendaWidget", c.a.$inject).directive("smAvailableWidget", ["$timeout", "vandaagDefaults", l.a]).directive("takenWidget", o.a.$inject),
            g.controller("vandaagController", d.a),
            g.filter("afspraakStatus", i.a.prototype.afspraakStatus)
        }
        .call(this, t(2))
    },
    655: function(e, n, t) {
        "use strict";
        (function(e) {
            t.d(n, "a", (function() {
                return o
            }
            ));
            var i, a = t(112), r = (i = function(e, n) {
                return (i = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(e, n) {
                    e.__proto__ = n
                }
                || function(e, n) {
                    for (var t in n)
                        Object.prototype.hasOwnProperty.call(n, t) && (e[t] = n[t])
                }
                )(e, n)
            }
            ,
            function(e, n) {
                if ("function" != typeof n && null !== n)
                    throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
                function t() {
                    this.constructor = e
                }
                i(e, n),
                e.prototype = null === n ? Object.create(n) : (t.prototype = n.prototype,
                new t)
            }
            ), s = function() {
                function n(e, n, t, i, a, r, s, o, c) {
                    var l = this;
                    this.$scope = e,
                    this.$location = n,
                    this.$routeParams = t,
                    this.$filter = i,
                    this.cijfersServiceOud = a,
                    this.aanmeldingenService = r,
                    this.laatsteCijfersAdapter = s,
                    this.currentUser = o,
                    this.cijfersService = c;
                    var d = this.currentUser.relatedPersons.current.id;
                    e.showGradesToday = !1,
                    e.showGradesWeek = !1;
                    var p = this.laatsteCijfersAdapter.getDefaultLaatsteCijfers();
                    this.setCijfers(e, p),
                    this.getLaatsteCijfers(e, +d),
                    e.redirectToPeriodOverview = function() {
                        l.$location.path("cijfers")
                    }
                    ,
                    e.hideCijfersOverzicht = function() {
                        e.showGradesToday = !1,
                        e.showGradesWeek = !1
                    }
                    ,
                    e.showToday = function() {
                        e.gradesAvailable && 0 !== e.gradesTodayCount && (e.showGradesToday = !0)
                    }
                    ,
                    e.showWeek = function() {
                        e.gradesAvailable && 0 !== e.gradesWeekCount && (e.showGradesWeek = !0)
                    }
                    ,
                    e.showLaatsteCijfers = function() {
                        return !e.showGradesToday && !e.showGradesWeek
                    }
                    ,
                    e.widgetTitle = function() {
                        return e.showGradesToday ? "Cijfers van vandaag" : e.showGradesWeek ? "Cijfers van deze week" : "Laatste cijfers"
                    }
                }
                return n.prototype.getLaatsteCijfers = function(e, n) {
                    var t = this;
                    this.cijfersService.getLaatstBehaaldeResultaten(n, 50, 0).then((function(n) {
                        t.setCijfers(e, n)
                    }
                    ))
                }
                ,
                n.prototype.setCijfers = function(n, t) {
                    var i;
                    e.isDefined(t) && e.isDefined(t.items) && null !== t.items && (i = t);
                    var a = null;
                    a = e.isDefined(i) && e.isDefined(i.items) && null !== i.items ? this.laatsteCijfersAdapter.createLaatsteCijfers(i) : this.laatsteCijfersAdapter.getDefaultLaatsteCijfers(),
                    n.gradesToday = a.vandaagCijfers,
                    n.gradesWeek = a.weekCijfers,
                    n.lastGrade = a.laatsteCijfer,
                    n.gradesTodayCount = n.gradesToday.length,
                    n.gradesWeekCount = n.gradesWeek.length;
                    var r = a.laatsteCijfer;
                    n.gradesAvailable = "-" !== r.waarde
                }
                ,
                n.$inject = ["$scope", "$location", "$routeParams", "$filter", "cijfersServiceOud", "aanmeldingenService", "laatsteCijfersAdapter", "currentUser", "cijfersService", n],
                n
            }(), o = function(e) {
                function n(n, i, a, r, o, c, l, d) {
                    var p = e.call(this) || this;
                    return p.$location = n,
                    p.$routeParams = i,
                    p.$filter = a,
                    p.cijfersServiceOud = r,
                    p.aanmeldingenService = o,
                    p.laatsteCijfersAdapter = c,
                    p.currentUser = l,
                    p.cijfersService = d,
                    p.template = t(656),
                    p.replace = !0,
                    p.link = function(e, n, t) {
                        return p.linkFn(e, n, t)
                    }
                    ,
                    p.controller = ["$scope", "$location", "$routeParams", "$filter", "cijfersServiceOud", "aanmeldingenService", "laatsteCijfersAdapter", "currentUser", "cijfersService", s],
                    p
                }
                return r(n, e),
                n.prototype.linkFn = function(n, t, i) {
                    e.prototype.linkFn.call(this, n, t, i)
                }
                ,
                n.$inject = ["$location", "$routeParams", "$filter", "cijfersServiceOud", "aanmeldingenService", "laatsteCijfersAdapter", "currentUser", "cijfersService", function(e, t, i, a, r, s, o, c) {
                    return new n(e,t,i,a,r,s,o,c)
                }
                ],
                n
            }(a.a)
        }
        ).call(this, t(2))
    },
    656: function(e, n) {
        e.exports = '<div id="cijfers-leerling" class="widget">\r\n    <div class="block grade-widget" data-sm-loading-indicator="{domain: \'aanmeldingen\', overlay: false, timeout: 1000}">\r\n        <h3 data-ng-if="showLaatsteCijfers()">\r\n            <span data-widget-resize-button data-widget-name="cijfers-leerling"></span>\r\n            <b>{{widgetTitle()}}</b>\r\n        </h3>\r\n        \r\n        <h3 data-ng-class="{\'detail\' : !showLaatsteCijfers()}" style="cursor: pointer" data-ng-if="!showLaatsteCijfers()" data-ng-click="hideCijfersOverzicht();">\r\n            <span data-ng-hide="showLaatsteCijfers()" class="grade-back icon-back" data-ng-click="hideCijfersOverzicht();"></span>\r\n            <b>{{widgetTitle()}}</b>\r\n        </h3>\r\n        <div class="content" data-ng-class="{false: \'no-data\'}[gradesAvailable]">\r\n            <div class="last-grade" data-ng-show="showLaatsteCijfers()"><span class="cijfer">{{lastGrade.waarde}}</span><span class="omschrijving" title="{{lastGrade.vak.omschrijving}}">{{lastGrade.vak.omschrijving}}</span></div>\r\n            <ul class="list arrow-list" data-ng-show="showLaatsteCijfers()">\r\n                <li data-ng-class="{true: \'unread\', false: \'no-data\'}[gradesTodayCount > 0]">\r\n                    <a href="" data-ng-click="showToday();" title=""><span class="nr">{{gradesTodayCount}}</span> vandaag</a>\r\n                </li>\r\n                <li data-ng-class="{true: \'unread\', false: \'no-data\'}[gradesWeekCount > 0]">\r\n                    <a href="" data-ng-click="showWeek();" title=""><span class="nr">{{gradesWeekCount}}</span> deze week</a>\r\n                </li>\r\n            </ul>\r\n            <ul class="list grades-list" data-ng-show="showGradesToday">\r\n                <li data-ng-repeat="today in gradesToday" data-sm-notify-complete="aanmeldingen">\r\n                    <a href="">\r\n                        <span title="{{today.waarde}}" class="student-grade-widget-grade" data-ng-class="{true: \'\', false: \'student-grade-widget-grade-insufficient\'}[{{today.isCijferVoldoende || true}}]">{{today.waarde}}</span>\r\n                        <span class="student-grade-widget-class">{{today.vak.omschrijving}}</span>\r\n                        <span class="student-grade-widget-entry-date">{{today.ingevoerdOp | date: \'d-MM HH:mm\'}}</span>\r\n                    </a>\r\n                </li>\r\n            </ul>\r\n            <ul class="list grades-list" data-ng-show="showGradesWeek">\r\n                <li data-ng-repeat="week in gradesWeek" data-sm-notify-complete="aanmeldingen">\r\n                    <a href="">\r\n                        <span title="{{week.waarde}}" class="student-grade-widget-grade" data-ng-class="{true: \'\', false: \'student-grade-widget-grade-insufficient\'}[{{week.isVoldoende || true}}]">{{week.waarde}}</span>\r\n                        <span class="student-grade-widget-class">{{week.vak.omschrijving}}</span>\r\n                        <span class="student-grade-widget-entry-date">{{week.ingevoerdOp | date: \'d-MM HH:mm\'}}</span>\r\n                    </a>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n        <footer class="endlink">\r\n            <a href="#/cijfers" data-ng-click="redirectToPeriodOverview();" title="">periodeoverzicht</a>\r\n        </footer>\r\n    </div>\r\n</div>\r\n'
    },
    657: function(e, n, t) {
        "use strict";
        (function(e, i, a) {
            t.d(n, "a", (function() {
                return c
            }
            ));
            var r, s = t(112), o = (r = function(e, n) {
                return (r = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(e, n) {
                    e.__proto__ = n
                }
                || function(e, n) {
                    for (var t in n)
                        Object.prototype.hasOwnProperty.call(n, t) && (e[t] = n[t])
                }
                )(e, n)
            }
            ,
            function(e, n) {
                if ("function" != typeof n && null !== n)
                    throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
                function t() {
                    this.constructor = e
                }
                r(e, n),
                e.prototype = null === n ? Object.create(n) : (t.prototype = n.prototype,
                new t)
            }
            ), c = function(n) {
                function r(e, i, a, r, s) {
                    var o = n.call(this) || this;
                    return o.notificatieService = e,
                    o.$rootScope = i,
                    o.applicationService = a,
                    o.aanmeldingenService = r,
                    o.currentUser = s,
                    o.replace = !0,
                    o.template = t(658),
                    o.link = function(e, n, t) {
                        return o.linkFn(e, n, t)
                    }
                    ,
                    o
                }
                return o(r, n),
                r.prototype.linkFn = function(e, t, i) {
                    n.prototype.linkFn.call(this, e, t, i),
                    this.processNotificationItems(e)
                }
                ,
                r.prototype.processNotificationItems = function(n) {
                    var t = this;
                    this.aanmeldingenService.getLeerlingAanmeldingen(this.currentUser.relatedPersons.current.id).then((function(r) {
                        var s, o = e((new Date).setHours(0, 0, 0, 0));
                        if (i.each(r, (function(n) {
                            e(t.toCrossBrowserDateString("" + n.begin)) <= o && e(t.toCrossBrowserDateString("" + n.einde)) >= o && (s = n)
                        }
                        )),
                        a.isDefined(s)) {
                            var c = e(t.toCrossBrowserDateString("" + s.begin)).format("YYYY-MM-DD")
                              , l = e(t.toCrossBrowserDateString("" + s.einde)).format("YYYY-MM-DD");
                            n.notificatieData = t.notificatieService.getNotificatieItems(c, l)
                        }
                        t.$rootScope.$broadcast("NG_REPEAT_FINISHED", "notificatie")
                    }
                    ))
                }
                ,
                r.prototype.toCrossBrowserDateString = function(e) {
                    return e.replace("0000Z", "Z")
                }
                ,
                r.$inject = ["notificatieService", "$rootScope", "applicationService", "aanmeldingenService", "currentUser", function(e, n, t, i, a) {
                    return new r(e,n,t,i,a)
                }
                ],
                r
            }(s.a)
        }
        ).call(this, t(16), t(4), t(2))
    },
    658: function(e, n) {
        e.exports = '<div id="notificatie-widget" class="widget">\r\n    <div class="block" data-sm-loading-indicator="{domain: \'notificatie\', hideEvent: \'NG_REPEAT_FINISHED\', overlay: false, timeout: 1000}">\r\n        <h3>\r\n            <span data-widget-resize-button data-widget-name="notificatie-widget"></span>\r\n            <b>Notificaties</b>\r\n        </h3>\r\n        <div class="content" data-sm-scrollbar="scrollbar" data-horizontal-scroll="false">\r\n            <ul class="list">\r\n                <li data-ng-repeat="notificatieItem in notificatieData.notificatieItems" data-ng-class="{\'unread\' : notificatieItem.count !== 0, \'no-data\': notificatieItem.count === 0}" data-sm-notify-complete="opdrachten">\r\n                    <a data-ng-href="{{notificatieItem.link}}" title=""><span>{{notificatieItem.countDescription}}</span> {{notificatieItem.name}}</a>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n        <footer class="endlink"></footer>\r\n    </div>\r\n</div>'
    },
    659: function(e, n, t) {
        "use strict";
        (function(e) {
            t.d(n, "a", (function() {
                return a
            }
            ));
            var i = function() {
                function n(e, n) {
                    this.instellingService = e,
                    this.currentUser = n
                }
                return n.prototype.saveInstellingen = function() {
                    var n = this
                      , t = e.map(this.vakken, (function(e) {
                        return {
                            Id: e.id,
                            IsChecked: e.IsChecked
                        }
                    }
                    ));
                    this.instellingService.setForRelatedPerson(this.currentUser.person.id, this.currentUser.relatedPersons.current.id, "cijferKolommenVoorOuder", t).then((function(e) {
                        n.onSaved()
                    }
                    ))
                }
                ,
                n
            }();
            function a() {
                return {
                    template: t(660),
                    restrict: "A",
                    replace: !1,
                    scope: {
                        vakken: "<",
                        onSaved: "&"
                    },
                    controller: ["instellingService", "currentUser", i],
                    controllerAs: "ctrl",
                    bindToController: !0
                }
            }
        }
        ).call(this, t(4))
    },
    660: function(e, n) {
        e.exports = '<div class="mask"></div>\r\n<div class="quick-menu">\r\n    <span class="arrow"></span>\r\n    <h3><b>Vakkeuze</b></h3>\r\n    <form action="#">\r\n        <div class="filter-content">\r\n            <ul class="list">\r\n                <li ng-repeat="vak in ctrl.vakken">\r\n                    <span class="check">\r\n                        <input type="checkbox" class="checkbox" name="VAK-{{vak.id}}" ng-model="vak.IsChecked" id="VAK-{{vak.id}}">\r\n                        <label for="VAK-{{vak.id}}"><span></span>{{vak.omschrijving}}</label>\r\n                    </span>                    \r\n                </li>\r\n            </ul>\r\n        </div>\r\n    </form>\r\n    <footer class="endlink">\r\n        <a href="" ng-click="ctrl.saveInstellingen();" class="btn-pri">opslaan</a>\r\n    </footer>\r\n</div>\r\n'
    },
    661: function(e, n, t) {
        "use strict";
        t.d(n, "a", (function() {
            return s
        }
        ));
        var i, a = t(112), r = (i = function(e, n) {
            return (i = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, n) {
                e.__proto__ = n
            }
            || function(e, n) {
                for (var t in n)
                    Object.prototype.hasOwnProperty.call(n, t) && (e[t] = n[t])
            }
            )(e, n)
        }
        ,
        function(e, n) {
            if ("function" != typeof n && null !== n)
                throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
            function t() {
                this.constructor = e
            }
            i(e, n),
            e.prototype = null === n ? Object.create(n) : (t.prototype = n.prototype,
            new t)
        }
        ), s = function(e) {
            function n() {
                var n = e.call(this) || this;
                return n.template = t(662),
                n.replace = !0,
                n.link = function(e, t, i) {
                    return n.linkFn(e, t, i)
                }
                ,
                n
            }
            return r(n, e),
            n.prototype.linkFn = function(n, t, i) {
                e.prototype.linkFn.call(this, n, t, i)
            }
            ,
            n.$inject = [function() {
                return new n
            }
            ],
            n
        }(a.a)
    },
    662: function(e, n) {
        e.exports = '<div id="taken-widget" class="widget">\r\n    <div class="block">\r\n        <h3><b>Taken</b></h3>\r\n        <div class="content no-data">\r\n            <em>Er zijn geen taken op dit moment.</em>\r\n        </div>\r\n        <footer class="endlink no-link">alle taken</footer>\r\n    </div>\r\n</div>\r\n'
    },
    663: function(e, n, t) {
        "use strict";
        (function(e, i, a) {
            t.d(n, "a", (function() {
                return p
            }
            ));
            var r, s = t(5), o = t(1), c = t(112), l = (r = function(e, n) {
                return (r = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(e, n) {
                    e.__proto__ = n
                }
                || function(e, n) {
                    for (var t in n)
                        Object.prototype.hasOwnProperty.call(n, t) && (e[t] = n[t])
                }
                )(e, n)
            }
            ,
            function(e, n) {
                if ("function" != typeof n && null !== n)
                    throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
                function t() {
                    this.constructor = e
                }
                r(e, n),
                e.prototype = null === n ? Object.create(n) : (t.prototype = n.prototype,
                new t)
            }
            ), d = function() {
                return (d = Object.assign || function(e) {
                    for (var n, t = 1, i = arguments.length; t < i; t++)
                        for (var a in n = arguments[t])
                            Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
                    return e
                }
                ).apply(this, arguments)
            }, p = function(n) {
                function r(e, i, a, r, s, o, c) {
                    var l = n.call(this) || this;
                    return l.$anchorScroll = e,
                    l.$location = i,
                    l.$timeout = a,
                    l.agendaService = r,
                    l.roosterwijzigingenService = s,
                    l.additionalAppointmentsService = o,
                    l.currentUser = c,
                    l.template = t(664),
                    l.replace = !0,
                    l.link = function(e, n, t) {
                        return l.linkFn(e, n, t)
                    }
                    ,
                    l.additionalAppointmentsService.initAdditionalAppointmentsComponent(),
                    l
                }
                return l(r, n),
                r.prototype.linkFn = function(e, t, i) {
                    var a = this;
                    n.prototype.linkFn.call(this, e, t, i),
                    this.agendaWidgetScope = e,
                    e.onAdditionalAppointmentClick = function(e) {
                        return a.onAdditionalAppointmentClick(e)
                    }
                    ,
                    this.onDialogClose = this.onDialogClose.bind(this),
                    this.getAfspraken(e)
                }
                ,
                r.prototype.onAdditionalAppointmentClick = function(e) {
                    this.openAdditionalAppointmentEnrollmentDialog(e)
                }
                ,
                r.prototype.getAfspraken = function(n) {
                    var t, i = this, a = e().format("YYYY-MM-DD"), r = e().day(e().day() + 1).format("YYYY-MM-DD"), s = this.currentUser.relatedPersons.current.id, o = e(e().format("YYYY-MM-DD"), "YYYY-MM-DD");
                    t = 5 === e(o).day() ? e(o).day(e(o).day() + 3) : e(o).day(e(o).day() + 1);
                    var c = []
                      , l = [];
                    n.agendaData = void 0,
                    this.agendaService.getAfspraken(s, a, r, !0, "1,2,3,4,6,7,8,9").then((function(e) {
                        var a = e.filter((function() {
                            return i.filterItemsOpVervallenStatus
                        }
                        ));
                        i.roosterwijzigingenService.get(s).then((function(e) {
                            if (a) {
                                var r = i.mapAfspraken(a, e.agendaItems, o, t)
                                  , s = r.mappedToday
                                  , d = r.mappedTomorrow;
                                c.push.apply(c, s),
                                c = i.additionalAppointmentsService.removeNotEnrollableAdditionalAppointmentsWhenApplicable(c),
                                i.additionalAppointmentsService.sortAgendaData(c),
                                l.push.apply(l, d),
                                l = i.additionalAppointmentsService.removeNotEnrollableAdditionalAppointmentsWhenApplicable(l),
                                i.additionalAppointmentsService.sortAgendaData(l),
                                i.setAgendaData(n, t, c, l)
                            }
                            n.isDoneLoading = !0
                        }
                        ))
                    }
                    )),
                    this.additionalAppointmentsService.isAdditionalAppointmentsEnabled().then((function(e) {
                        e && i.additionalAppointmentsService.getAdditionalAppointments(a, r).then((function(e) {
                            if (e.length) {
                                var a = i.additionalAppointmentsService.getByDay(e, o)
                                  , r = i.additionalAppointmentsService.getByDay(e, t);
                                c.push.apply(c, a),
                                c = i.additionalAppointmentsService.removeNotEnrollableAdditionalAppointmentsWhenApplicable(c),
                                i.additionalAppointmentsService.sortAgendaData(c),
                                l.push.apply(l, r),
                                l = i.additionalAppointmentsService.removeNotEnrollableAdditionalAppointmentsWhenApplicable(l),
                                i.additionalAppointmentsService.sortAgendaData(l),
                                i.setAgendaData(n, t, c, l),
                                n.isDoneLoading = !0
                            }
                        }
                        ))
                    }
                    ))
                }
                ,
                r.prototype.filterItemsOpVervallenStatus = function(e) {
                    return e.status !== Contracts.Agenda.Afspraken.Enums.AfspraakStatus.VervallenAutomatisch && e.status !== Contracts.Agenda.Afspraken.Enums.AfspraakStatus.VervallenHandmatig
                }
                ,
                r.prototype.mapToVandaagAgendaItem = function(e) {
                    var n = this;
                    return this.agendaService.mapItemsToViewModel(e).map((function(e) {
                        return d(d({}, e), {
                            omschrijvingSummary: n.getOmschrijvingSummary(e),
                            dashboardUrl: n.getDashboardUrl(e)
                        })
                    }
                    )).sort((function(e, n) {
                        return e.begin < n.begin ? -1 : e.begin > n.begin ? 1 : 0
                    }
                    ))
                }
                ,
                r.prototype.getOmschrijvingSummary = function(e) {
                    var n = this.currentUser.isInRole(s.a.Ouder)
                      , t = e.status === Contracts.Agenda.Afspraken.Enums.AfspraakStatus.VervallenHandmatig || e.status === Contracts.Agenda.Afspraken.Enums.AfspraakStatus.VervallenAutomatisch
                      , i = e.afspraakType === Contracts.Agenda.Afspraken.Enums.AfspraakType.Persoonlijk
                      , a = e.locatie && !!e.locatie.length
                      , r = e.lokaal && !!e.lokaal.length;
                    return a && !t ? n && i ? e.omschrijving : Object(o.h)("{0} ({1})", e.omschrijving, e.locatie) : a || !r || t ? a || r || t ? t ? "-" : "" : e.omschrijving : n && i ? e.omschrijving : Object(o.h)("{0} ({1})", e.omschrijving, e.lokaal)
                }
                ,
                r.prototype.getCurrentItemId = function(n) {
                    var t, a = e();
                    return (t = i.filter(n, (function(e) {
                        return e.einde <= a
                    }
                    ))).length ? i.last(t).id : 0
                }
                ,
                r.prototype.scrollTo = function(e) {
                    var n = this;
                    this.$timeout((function() {
                        var t = n.$location.hash();
                        n.$location.hash("afspraak" + e),
                        n.$anchorScroll(),
                        n.$location.hash("vandaagschermtop"),
                        n.$anchorScroll(),
                        n.$location.hash("ng-app"),
                        n.$anchorScroll(),
                        n.$location.hash(t)
                    }
                    ), 500)
                }
                ,
                r.prototype.mapAfspraken = function(e, n, t, i) {
                    var a, r;
                    return a = this.agendaService.mergeAfsprakenArrays(this.agendaService.getByDay(e, t), this.agendaService.getByDay(n, t)),
                    r = this.agendaService.mergeAfsprakenArrays(this.agendaService.getByDay(e, i), this.agendaService.getByDay(n, i), !0),
                    {
                        mappedToday: this.mapToVandaagAgendaItem(a),
                        mappedTomorrow: this.mapToVandaagAgendaItem(r)
                    }
                }
                ,
                r.prototype.setAgendaData = function(e, n, t, i) {
                    var r = "";
                    a.isUndefined(this.currentUser.relatedPersons.current) || this.currentUser.person === this.currentUser.relatedPersons.current || (r = "Agenda van " + this.getFirstName(this.currentUser.relatedPersons.current.fullName)),
                    e.morgen = new Date(n.format("YYYY-MM-DD")),
                    e.agendaData = {
                        titel: r,
                        titelMorgen: "Wijzigingen voor " + n.format("dddd"),
                        agendaItemsVandaag: t,
                        agendaItemsMorgen: i
                    };
                    var s = this.getCurrentItemId(e.agendaData.agendaItemsVandaag);
                    this.scrollTo(s.toString())
                }
                ,
                r.prototype.getDashboardUrl = function(e) {
                    return e.id < 0 ? "" : "#/agenda/" + (e.afspraakType === Contracts.Agenda.Afspraken.Enums.AfspraakType.Les || e.afspraakType === Contracts.Agenda.Afspraken.Enums.AfspraakType.Kwt ? "huiswerk" : "afspraak") + "/" + e.id
                }
                ,
                r.prototype.getFirstName = function(e) {
                    return e.split(" ")[0]
                }
                ,
                r.prototype.openAdditionalAppointmentEnrollmentDialog = function(e) {
                    var n = document.createElement("calendar-additional-appointment-enrollment");
                    n.accountExterneId = this.currentUser.relatedPersons.current.accountExterneId,
                    n.period = {
                        start: e.start,
                        end: e.end
                    },
                    n.groupingId = e.groupingId,
                    n.readonly = !this.currentUser.roles.includes(s.a.Leerling),
                    n.addEventListener("dialogClose", this.onDialogClose),
                    n.show()
                }
                ,
                r.prototype.onDialogClose = function(e) {
                    e.detail && this.getAfspraken(this.agendaWidgetScope)
                }
                ,
                r.$inject = ["$anchorScroll", "$location", "$timeout", "agendaService", "roosterwijzigingenService", "additionalAppointmentsService", "currentUser", function(e, n, t, i, a, s, o) {
                    return new r(e,n,t,i,a,s,o)
                }
                ],
                r
            }(c.a)
        }
        ).call(this, t(16), t(4), t(2))
    },
    664: function(e, n) {
        e.exports = '<div id="agenda-widget" class="widget agenda-widget">\r\n    <div class="block" data-sm-loading-indicator="{domain: \'afspraken\', hideEvent: \'NG_REPEAT_FINISHED\', overlay: false, timeout: 1000}">\r\n        <h3>\r\n            <span data-widget-resize-button data-widget-name="agenda-widget"></span>\r\n            <b>Vandaag</b>\r\n        </h3>\r\n        <div class="content">\r\n            <div data-ng-show="isDoneLoading" id="agendawidgetlistcontainer">\r\n                <ul class="list agenda-list" data-ng-show="agendaData.agendaItemsVandaag.length">\r\n                    <li data-ng-repeat="afspraak in agendaData.agendaItemsVandaag" class="{{afspraak | afspraakStatus}}" data-sm-notify-complete="afspraken">\r\n                        <div data-ng-if="afspraak.isAdditionalAppointment" data-ng-click="onAdditionalAppointmentClick(afspraak)" ng-class="{\r\n                            \'additional-appointment\': afspraak.isAdditionalAppointment, \r\n                            \'enrolled\': afspraak.isEnrolled, \r\n                            \'not-enrolled\': afspraak.isNotEnrolled, \r\n                            \'not-enrollable\': afspraak.isNotEnrollable}">\r\n                            <div class="time-description-container">\r\n                                <span class="time" data-ng-bind-template="{{afspraak.begin.toDate() | date:\'HH:mm\'}} - {{afspraak.einde.toDate() | date:\'HH:mm\'}}"></span>\r\n                                <div class="nrblock-description-container">\r\n                                    <span data-ng-show="{{afspraak.timeSlot != \'\'}}" class="nrblock" data-ng-bind="afspraak.timeSlot"></span>\r\n                                    <div class="description-container">\r\n                                        <span ng-if="afspraak.isEnrolled">Keuze wijzigen</span>\r\n                                        <span ng-if="afspraak.isNotEnrolled"><strong>Keuze maken</strong></span>\r\n                                        <span ng-if="afspraak.isNotEnrollable">Geen keuze</span>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class="icon-container">\r\n                                <dna-icon ng-if="afspraak.isEnrolled" name="far-calendar-check"></dna-icon>\r\n                                <dna-icon ng-if="afspraak.isNotEnrolled" name="far-calendar-plus"></dna-icon>\r\n                                <dna-icon ng-if="afspraak.isNotEnrollable" name="far-calendar-xmark"></dna-icon>\r\n                            </div>\r\n                        </div>\r\n                       \r\n                        <a data-ng-if="!afspraak.isAdditionalAppointment" data-ng-href="{{afspraak.dashboardUrl}}" title="" id="afspraak{{afspraak.id}}">\r\n                            <span class="time" data-ng-bind-template="hele dag" data-ng-if="afspraak.isHeleDag"></span>\r\n                            <span class="time" data-ng-bind-template="{{afspraak.beginString |date:\'HH:mm\'}} - {{afspraak.eindString | date:\'HH:mm\'}}" data-ng-if="!afspraak.isHeleDag"></span>\r\n                            \r\n                            <div class="les-bottom"> \r\n                                <div class="les-info">\r\n                                    <span data-ng-show="{{afspraak.lesuur != \'\'}}" class="nrblock" data-ng-bind="afspraak.lesuur"></span>\r\n                                    <span ng-if="afspraak.afspraakType === 1" class="alt-nrblock">\r\n                                        <i class="far fa-user-lock"></i>\r\n                                    </span>\r\n                                    <span ng-if="afspraak.afspraakType === 16" class="alt-nrblock">\r\n                                        <i class="far fa-user-edit"></i>\r\n                                    </span>\r\n                                    <span data-ng-if="::afspraak.isOnlineDeelname" class="video-icon">\r\n                                        <i class="fas fa-video"></i>\r\n                                    </span>\r\n                                    <span class="classroom" data-ng-bind-template="{{afspraak.omschrijvingSummary}}" ></span> \r\n                                </div>\r\n                                <div class="icon-block">\r\n                                    <span data-ng-if="afspraak.heeftBijlagen" class="text-icon icon-only">\r\n                                        <i class="far fa-paperclip"></i>\r\n                                    </span>\r\n                                    <span data-ng-if="afspraak.isHerhalend" class="text-icon icon-only">\r\n                                        <i class="fas fa-repeat-alt"></i>\r\n                                    </span>\r\n\r\n                                    <span data-ng-if="afspraak.heeftInformatie || afspraak.heeftOpmerking" class="agenda-text-icon outline" icon-type="information">Informatie</span>\r\n                                \r\n                                    \x3c!--huiswerk--\x3e\r\n                                    <span data-ng-if="(!afspraak.heeftProefwerk && !afspraak.heeftTussentijdseToets && !afspraak.heeftSchriftelijkeOverhoring\r\n                                        && !afspraak.heeftMondelingeOverhoring && !afspraak.isExamen) \r\n                                        && (afspraak.heeftOnafgerondHuiswerk || afspraak.heeftAfgerondHuiswerk)" class="agenda-text-icon"\r\n                                            ng-class="{\'outline\': !afspraak.heeftAfgerondHuiswerk}"\r\n                                            icon-type="{{afspraak.heeftAfgerondHuiswerk ? \'ok\': \'information\'}}">Huiswerk</span>\r\n\r\n                                    \x3c!--toetsen--\x3e\r\n                                    <span data-ng-if="afspraak.heeftProefwerk" class="text-icon" icon-type="information">Proefwerk</span>\r\n                                    <span data-ng-if="afspraak.heeftTussentijdseToets" class="text-icon" icon-type="information">Tentamen</span>\r\n                                    <span data-ng-if="afspraak.heeftSchriftelijkeOverhoring" class="text-icon" icon-type="information">SO</span>\r\n                                    <span data-ng-if="afspraak.heeftMondelingeOverhoring" class="text-icon" icon-type="information">MO</span>\r\n                                    <span data-ng-if="afspraak.isExamen" class="text-icon" icon-type="information">{{afspraak.afspraakSubType}}</span>\r\n                                </div>\r\n                            </div>\r\n                        </a>\r\n                    </li>\r\n                </ul>\r\n                <ul class="list agenda-list" data-ng-hide="agendaData.agendaItemsVandaag.length">\r\n                    <li class="no-data">\r\n                        <em>Er zijn geen afspraken op dit moment.</em>\r\n                    </li>\r\n                </ul>\r\n                <h4 data-ng-show="agendaData.agendaItemsMorgen.length" data-ng-bind-template="{{agendaData.titelMorgen}}"></h4>\r\n                <ul class="list agenda-list roosterwijziging" data-ng-show="agendaData.agendaItemsMorgen.length">\r\n                    <li data-ng-repeat="wijziging in agendaData.agendaItemsMorgen" class="{{wijziging | afspraakStatus}}" data-sm-notify-complete="afspraken">\r\n                        <div data-ng-if="wijziging.isAdditionalAppointment" data-ng-click="onAdditionalAppointmentClick(wijziging)" ng-class="{\r\n                            \'additional-appointment\': wijziging.isAdditionalAppointment, \r\n                            \'enrolled\': wijziging.isEnrolled, \r\n                            \'not-enrolled\': wijziging.isNotEnrolled, \r\n                            \'not-enrollable\': wijziging.isNotEnrollable}">\r\n                            <div class="time-description-container">\r\n                                <span class="time" data-ng-bind-template="{{wijziging.begin.toDate() | date:\'HH:mm\'}} - {{wijziging.einde.toDate() | date:\'HH:mm\'}}"></span>\r\n                                <div class="nrblock-description-container">\r\n                                    <span data-ng-show="{{wijziging.timeSlot != \'\'}}" class="nrblock" data-ng-bind="wijziging.timeSlot"></span>\r\n                                    <div class="description-container">\r\n                                        <span ng-if="wijziging.isEnrolled">Keuze wijzigen</span>\r\n                                        <span ng-if="wijziging.isNotEnrolled"><strong>Keuze maken</strong></span>\r\n                                        <span ng-if="wijziging.isNotEnrollable">Geen keuze</span>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class="icon-container">\r\n                                <dna-icon ng-if="wijziging.isEnrolled" name="far-calendar-check"></dna-icon>\r\n                                <dna-icon ng-if="wijziging.isNotEnrolled" name="far-calendar-plus"></dna-icon>\r\n                                <dna-icon ng-if="wijziging.isNotEnrollable" name="far-calendar-xmark"></dna-icon>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <a data-ng-if="!wijziging.isAdditionalAppointment" data-ng-href="{{wijziging.dashboardUrl}}" title="">\r\n                            <span class="time" data-ng-bind-template="{{wijziging.beginString | date:\'HH:mm\'}} - {{wijziging.eindString | date:\'HH:mm\'}}"></span>\r\n                            \r\n                            <div class="les-bottom">\r\n                                <div class="les-info">\r\n                                    <span data-ng-show="{{wijziging.lesuur != \'\'}}" class="nrblock" data-ng-bind="wijziging.lesuur"></span>\r\n                                    <span data-ng-if="::wijziging.isOnlineDeelname" class="video-icon">\r\n                                        <i class="fas fa-video"></i>\r\n                                    </span>\r\n                                    <span class="classroom" data-ng-if="wijziging.locatie && (wijziging.status != 4 && wijziging.status != 5) && isOuder" data-ng-bind-template="{{wijziging.omschrijving}}"></span>\r\n                                    <span class="classroom" data-ng-if="wijziging.locatie && (wijziging.status != 4 && wijziging.status != 5) && !isOuder" data-ng-bind-template="{{wijziging.omschrijving}} ({{wijziging.locatie}})"></span>\r\n                                    <span class="classroom" data-ng-if="(!wijziging.locatie.length && wijziging.lokaal.length) && (wijziging.status != 4 && wijziging.status != 5) && isOuder" data-ng-bind-template="{{wijziging.omschrijving}}"></span>\r\n                                    <span class="classroom" data-ng-if="(!wijziging.locatie.length && wijziging.lokaal.length) && (wijziging.status != 4 && wijziging.status != 5) && !isOuder" data-ng-bind-template="{{wijziging.omschrijving}} ({{wijziging.lokaal}})"></span>\r\n                                    <span class="classroom" data-ng-if="(!wijziging.locatie.length && !wijziging.lokaal.length) && (wijziging.status != 4 && wijziging.status != 5)" data-ng-bind="wijziging.omschrijving"></span>\r\n                                    <span class="classroom" data-ng-if="wijziging.status == 4 || wijziging.status == 5">-</span>\r\n                                </div>\r\n                                <div class="icon-block">\r\n                                    <span data-ng-if="wijziging.heeftBijlagen" class="text-icon icon-only">\r\n                                        <i class="far fa-paperclip"></i>\r\n                                    </span>\r\n                                    <span data-ng-if="wijziging.isHerhalend" class="text-icon icon-only">\r\n                                        <i class="fas fa-repeat-alt"></i>\r\n                                    </span>\r\n                                \r\n                                    \x3c!--huiswerk--\x3e\r\n                                    <span data-ng-if="(!wijziging.heeftProefwerk && !wijziging.heeftTussentijdseToets && !wijziging.heeftSchriftelijkeOverhoring\r\n                                        && !wijziging.heeftMondelingeOverhoring && !wijziging.isExamen) \r\n                                        && (wijziging.heeftOnafgerondHuiswerk || wijziging.heeftAfgerondHuiswerk)" class="agenda-text-icon"\r\n                                            ng-class="{\'outline\': !wijziging.heeftAfgerondHuiswerk}"\r\n                                            icon-type="{{wijziging.heeftAfgerondHuiswerk ? \'ok\': \'information\'}}">Huiswerk</span>\r\n                    \r\n                                    <span data-ng-if="wijziging.heeftInformatie || wijziging.heeftOpmerking" class="agenda-text-icon outline" icon-type="information">Informatie</span>\r\n                                    \r\n                                    \x3c!--toetsen--\x3e\r\n                                    <span data-ng-if="wijziging.heeftProefwerk" class="text-icon" icon-type="information">Proefwerk</span>\r\n                                    <span data-ng-if="wijziging.heeftTussentijdseToets" class="text-icon" icon-type="information">Tentamen</span>\r\n                                    <span data-ng-if="wijziging.heeftSchriftelijkeOverhoring" class="text-icon" icon-type="information">SO</span>\r\n                                    <span data-ng-if="wijziging.heeftMondelingeOverhoring" class="text-icon" icon-type="information">MO</span>\r\n                                    <span data-ng-if="wijziging.isExamen" class="text-icon" icon-type="information">{{wijziging.afspraakSubType}}</span>\r\n                                </div>\r\n                            </div>\r\n                        </a>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n        <footer class="endlink"><a href="#/agenda/week" title="">weekoverzicht</a></footer>\r\n    </div>\r\n</div>\r\n'
    },
    665: function(e, n, t) {
        "use strict";
        (function(e) {
            function i(n, i) {
                return {
                    template: t(666),
                    scope: {
                        dragstart: "&",
                        dragend: "&",
                        dropTrashcan: "&",
                        canDelete: "=",
                        widgets: "="
                    },
                    link: function(t, i, a) {
                        t.handleDragStart = function(e) {
                            var n = t.dragstart();
                            void 0 !== n && n(e)
                        }
                        ,
                        t.handleDragEnd = function(e) {
                            n((function() {
                                var n = t.dragend();
                                void 0 !== n && n(e)
                            }
                            ), 0)
                        }
                        ,
                        t.handleDrop = function(i) {
                            e.isDefined(t.canDelete) && t.canDelete && n((function() {
                                var e = t.dropTrashcan(i);
                                void 0 !== e && e(i)
                            }
                            ), 0)
                        }
                        ,
                        t.createHintElement = function(n) {
                            var t = e.element(document.createElement(n.get(0).tagName));
                            return t.html(n.html()),
                            t.width(n.context.clientWidth),
                            t.height(n.context.clientHeight),
                            t.attr("id", n.attr("id")),
                            t.attr("class", n.attr("class")),
                            t.addClass("widget-drag-hint"),
                            t
                        }
                    }
                }
            }
            t.d(n, "a", (function() {
                return i
            }
            ))
        }
        ).call(this, t(2))
    },
    666: function(e, n) {
        e.exports = '<div class="widget available-widgets">\r\n    <div class="block">\r\n        <h3><b>Beschikbare widgets</b></h3>\r\n        <div class="content projects draggable">\r\n            <ul>\r\n                <li data-ng-repeat="widget in widgets"\r\n                    data-sm-drag-drop="{drag: true}"\r\n                    data-hint-element="createHintElement"\r\n                    data-dragstart="handleDragStart(widget)"\r\n                    data-dragend="handleDragEnd()" id="drag-available-{{$index}}"\r\n                    class="disable-selection">\r\n                    <span data-ng-class="widget.icon" class="widget-icon"></span>\r\n                    <span data-ng-bind="widget.Titel"></span>\r\n                </li>\r\n            </ul>\r\n            <div class="content recyclebin" ng-class="{\'candelete\': canDelete}" data-sm-drag-drop="{drop: true}" data-drag-enabled="editMode" data-drop="handleDrop">\r\n                <span class="icon-recyclebin"></span>\r\n            </div>\r\n        </div>\r\n        <footer class="endlink"></footer>\r\n    </div>\r\n</div>\r\n'
    },
    667: function(e, n, t) {
        "use strict";
        (function(e, i, a) {
            t.d(n, "a", (function() {
                return u
            }
            ));
            var r = t(1)
              , s = t(7)
              , o = t(9)
              , c = t(6)
              , l = t(13)
              , d = t(5)
              , p = function(e, n, t, i) {
                return new (t || (t = Promise))((function(a, r) {
                    function s(e) {
                        try {
                            c(i.next(e))
                        } catch (e) {
                            r(e)
                        }
                    }
                    function o(e) {
                        try {
                            c(i.throw(e))
                        } catch (e) {
                            r(e)
                        }
                    }
                    function c(e) {
                        var n;
                        e.done ? a(e.value) : (n = e.value,
                        n instanceof t ? n : new t((function(e) {
                            e(n)
                        }
                        ))).then(s, o)
                    }
                    c((i = i.apply(e, n || [])).next())
                }
                ))
            }
              , g = function(e, n) {
                var t, i, a, r, s = {
                    label: 0,
                    sent: function() {
                        if (1 & a[0])
                            throw a[1];
                        return a[1]
                    },
                    trys: [],
                    ops: []
                };
                return r = {
                    next: o(0),
                    throw: o(1),
                    return: o(2)
                },
                "function" == typeof Symbol && (r[Symbol.iterator] = function() {
                    return this
                }
                ),
                r;
                function o(r) {
                    return function(o) {
                        return function(r) {
                            if (t)
                                throw new TypeError("Generator is already executing.");
                            for (; s; )
                                try {
                                    if (t = 1,
                                    i && (a = 2 & r[0] ? i.return : r[0] ? i.throw || ((a = i.return) && a.call(i),
                                    0) : i.next) && !(a = a.call(i, r[1])).done)
                                        return a;
                                    switch (i = 0,
                                    a && (r = [2 & r[0], a.value]),
                                    r[0]) {
                                    case 0:
                                    case 1:
                                        a = r;
                                        break;
                                    case 4:
                                        return s.label++,
                                        {
                                            value: r[1],
                                            done: !1
                                        };
                                    case 5:
                                        s.label++,
                                        i = r[1],
                                        r = [0];
                                        continue;
                                    case 7:
                                        r = s.ops.pop(),
                                        s.trys.pop();
                                        continue;
                                    default:
                                        if (!(a = s.trys,
                                        (a = a.length > 0 && a[a.length - 1]) || 6 !== r[0] && 2 !== r[0])) {
                                            s = 0;
                                            continue
                                        }
                                        if (3 === r[0] && (!a || r[1] > a[0] && r[1] < a[3])) {
                                            s.label = r[1];
                                            break
                                        }
                                        if (6 === r[0] && s.label < a[1]) {
                                            s.label = a[1],
                                            a = r;
                                            break
                                        }
                                        if (a && s.label < a[2]) {
                                            s.label = a[2],
                                            s.ops.push(r);
                                            break
                                        }
                                        a[2] && s.ops.pop(),
                                        s.trys.pop();
                                        continue
                                    }
                                    r = n.call(e, s)
                                } catch (e) {
                                    r = [6, e],
                                    i = 0
                                } finally {
                                    t = a = 0
                                }
                            if (5 & r[0])
                                throw r[1];
                            return {
                                value: r[0] ? r[1] : void 0,
                                done: !0
                            }
                        }([r, o])
                    }
                }
            }
              , u = function() {
                function n(n, t, a, r, s, o, c, l, d, p) {
                    var g = this;
                    this.$q = n,
                    this.$scope = t,
                    this.applicationService = a,
                    this.instellingService = r,
                    this.vandaagDefaults = s,
                    this.currentUser = o,
                    this.tabService = c,
                    this.schoolConfiguratieService = l,
                    this.profielResource = d,
                    this.oppMenuService = p,
                    this.VANDAAG_SCHERM_ALGEMEEN = "VANDAAG_SCHERM",
                    this.HIDE_TOUR_COOKIE = "HIDE_TOUR_COOKIE",
                    this.HIDE_INVALID_TIMEZONE = "HIDE_INVALID_TIMEZONE",
                    t.hideTour = !0,
                    t.editMode = !1,
                    t.tabState = this.tabService.tabState,
                    this.tabService.subscribeTabAdded(this.tabAdded, this),
                    t.editButtonTitle = "Schermindeling",
                    t.$watch("hideTour", (function() {
                        e.isDefined(t.hideTour) && g.applicationService.createSessionCookie(g.HIDE_TOUR_COOKIE, t.hideTour)
                    }
                    )),
                    t.hideInvalidTimezoneToast = this.applicationService.readSessionCookie(this.HIDE_INVALID_TIMEZONE),
                    this.applicationService.hideMessage(),
                    t.columns = [{
                        name: "column0",
                        order: 0
                    }, {
                        name: "column1",
                        order: 1
                    }, {
                        name: "column2",
                        order: 2
                    }],
                    this.showInvalidTimezoneToast(),
                    t.handleDrop = function(e) {
                        return g.handleDrop(e)
                    }
                    ,
                    t.dropTrash = function(e) {
                        return g.dropTrash(e)
                    }
                    ,
                    t.dragStartNewWidget = function(e) {
                        return g.handleDragStart(e)
                    }
                    ,
                    t.dragStartExistingWidget = function() {
                        t.canDelete = !0
                    }
                    ,
                    t.dragEndExistingWidget = function(e) {
                        t.canDelete = !1
                    }
                    ,
                    t.toggleEditMode = function() {
                        return g.toggleEditMode()
                    }
                    ,
                    t.closeOudersToestemmingDialog = function() {
                        t.toonOudersToestemmingDialog = !1
                    }
                    ,
                    t.toonOudersToestemmingDialog = !1,
                    t.createHintElement = function(n) {
                        var t = e.element(document.createElement(n.get(0).tagName));
                        return t.html(n.html()),
                        t.width(n.width()),
                        t.height(n.height()),
                        t.attr("id", n.attr("id")),
                        t.attr("class", n.attr("class")),
                        t.addClass("vandaag-drag-hint"),
                        t
                    }
                    ,
                    t.$on("widgetResized", (function(e, n) {
                        i.each(t.columnedWidgets, (function(e) {
                            i.each(e, (function(e) {
                                e.Naam === n && t.$evalAsync((function() {
                                    e.widgetHigh = !e.widgetHigh
                                }
                                ))
                            }
                            ))
                        }
                        ))
                    }
                    )),
                    this.getSettings(t)
                }
                return n.prototype.tabAdded = function(e) {
                    "idWidgets" === e.id && this.tabService.openTab(e)
                }
                ,
                n.prototype.getSettings = function(n) {
                    var t = this;
                    this.instellingService.get(this.currentUser.person.id, this.VANDAAG_SCHERM_ALGEMEEN).then((function(a) {
                        var s = a.widgets;
                        t.$scope.hideTourNextTime = !!a.hideTourNextTime3,
                        t.$scope.hideTourNextTimeSetting = !!a.hideTourNextTime3,
                        t.$scope.availableWidgets = [],
                        i.each(t.vandaagDefaults.vandaagSchermAlgemeen, (function(e) {
                            var n = i.find(s, (function(n) {
                                return n.Directive === e.Directive
                            }
                            ));
                            Object(r.w)(n) && t.currentUser.isInRoles(e.roles, l.a.One) && t.$scope.availableWidgets.push(e),
                            Object(r.t)(n) && (n.Privilege = e.Privilege,
                            Object(r.w)(n.widgetHigh) && (n.widgetHigh = e.widgetHigh))
                        }
                        )),
                        s = t.applyGroepFilter(t.applyPrivileges(s)),
                        t.$scope.columnedWidgets = i.groupBy(s, (function(e) {
                            return e.Positie.Kolom
                        }
                        )),
                        n.$watch("hideTourNextTime", (function(a, r) {
                            a !== r && e.isDefined(n.hideTourNextTime) && t.saveSettings(i.flatten(i.toArray(t.$scope.columnedWidgets)))
                        }
                        )),
                        t.currentUser.isInRole(d.a.Ouder) || t.vraagToestemmingGegevensOuders().then((function(e) {
                            n.toonOudersToestemmingDialog = e
                        }
                        )),
                        t.$scope.areSettingsLoaded = !0
                    }
                    ))
                }
                ,
                n.prototype.hasOppAcces = function() {
                    return p(this, void 0, void 0, (function() {
                        return g(this, (function(e) {
                            return [2, this.oppMenuService.getOppAccess().then((function(e) {
                                return e.hasOppAccess
                            }
                            )).catch((function() {
                                return !1
                            }
                            ))]
                        }
                        ))
                    }
                    ))
                }
                ,
                n.prototype.vraagToestemmingGegevensOuders = function() {
                    var e = this
                      , n = this.$q.defer()
                      , t = a()
                      , i = a(this.currentUser.person.birthday).clone();
                    return this.profielResource.get(this.currentUser.person.id).then((function(a) {
                        if (a.magInzageOudersInstellen) {
                            var r = (i = i.add("years", a.meerderJarigeLeeftijd)).diff(t, "months");
                            r >= 0 && !a.oudersMogenGegevensZien ? e.instellingService.get(e.currentUser.person.id, "toestemmingOudersMaanden").then((function(t) {
                                t && 3 === t.length ? (r <= 2 && !t[2] || r <= 1 && !t[1] || r <= 0 && !t[0]) && n.resolve(!0) : e.instellingService.set(e.currentUser.person.id, "toestemmingOudersMaanden", [!1, !1, !1]).then((function() {
                                    n.resolve(!0)
                                }
                                ))
                            }
                            )).catch((function() {
                                n.resolve(!1)
                            }
                            )) : n.resolve(!1)
                        } else
                            n.resolve(!1)
                    }
                    )).catch((function() {
                        n.resolve(!1)
                    }
                    )),
                    n.promise
                }
                ,
                n.prototype.toggleEditMode = function() {
                    this.$scope.editMode = !this.$scope.editMode,
                    this.$scope.editMode ? (this.tabService.tabState.tabContainerVisible = !0,
                    e.element("#edit-toggle-btn").attr("active", "true")) : (this.tabService.tabState.tabContainerVisible = !1,
                    e.element("#edit-toggle-btn").removeAttr("active")),
                    this.$scope.editButtonTitle = this.$scope.editMode ? "Opslaan" : "Schermindeling",
                    this.$scope.editMode || (i.forEach(this.$scope.columnedWidgets, (function(e) {
                        return i.forEach(e, (function(e) {
                            return e.Draggable = !1
                        }
                        ))
                    }
                    )),
                    this.saveSettings(i.flatten(i.toArray(this.$scope.columnedWidgets))),
                    this.$scope.columnedWidgets = e.copy(this.$scope.columnedWidgets)),
                    this.$scope.$applyAsync()
                }
                ,
                n.prototype.handleDragStart = function(e) {
                    this.$scope.canDelete = !1,
                    this.currentWidget = e
                }
                ,
                n.prototype.dropTrash = function(n) {
                    var t = n.draggable.currentTarget.attr("id").split("-");
                    e.isArray(t) && 3 === t.length && this.$scope.availableWidgets.push(this.$scope.columnedWidgets[+t[1]][+t[2]]),
                    this.$scope.columnedWidgets[+t[1]].splice(+t[2], 1)
                }
                ,
                n.prototype.handleDrop = function(n) {
                    var t, a = n.dropTarget.attr("id"), r = n.draggable.currentTarget.attr("id"), s = a.split("-"), o = [], c = !1;
                    if (null != this.currentWidget && e.isDefined(this.currentWidget))
                        t = {
                            Titel: this.currentWidget.Titel,
                            Naam: this.currentWidget.Naam,
                            Directive: this.currentWidget.Directive,
                            Privilege: this.currentWidget.Privilege,
                            Positie: {
                                Kolom: +s[1],
                                Volgnummer: +s[2]
                            },
                            Draggable: !0,
                            icon: this.currentWidget.icon,
                            roles: this.currentWidget.roles,
                            widgetHigh: !0
                        },
                        e.isDefined(this.$scope.columnedWidgets[+s[1]]) ? this.$scope.columnedWidgets[+s[1]].splice(+s[2], 0, t) : this.$scope.columnedWidgets[+s[1]] = [t],
                        this.$scope.availableWidgets = i.without(this.$scope.availableWidgets, this.currentWidget),
                        this.currentWidget = void 0;
                    else {
                        var l = r.split("-")
                          , d = void 0
                          , p = (d = "available" === l[1] ? this.$scope.availableWidgets : this.$scope.columnedWidgets[+l[1]])[+l[2]];
                        t = {
                            Titel: p.Titel,
                            Naam: p.Naam,
                            Directive: p.Directive,
                            Privilege: p.Privilege,
                            Positie: {
                                Kolom: p.Positie.Kolom,
                                Volgnummer: p.Positie.Volgnummer
                            },
                            Draggable: !0,
                            icon: p.icon,
                            roles: p.roles,
                            widgetHigh: !0
                        },
                        d.splice(+l[2], 1);
                        var g = 0
                          , u = this.$scope.columnedWidgets[+s[1]];
                        i.forEach(u, (function(e) {
                            !c && e.Positie.Volgnummer >= +s[2] && (t.Positie.Kolom = +s[1],
                            t.Positie.Volgnummer = g++,
                            o.push(t),
                            c = !0),
                            e.Positie.Volgnummer = g++,
                            o.push(e)
                        }
                        )),
                        c || (t.Positie.Kolom = +s[1],
                        t.Positie.Volgnummer = g,
                        o.push(t)),
                        this.$scope.columnedWidgets[+s[1]] = o
                    }
                }
                ,
                n.prototype.saveSettings = function(e) {
                    var n = {
                        widgets: e,
                        hideTourNextTime3: this.$scope.hideTourNextTime,
                        versie: 1
                    };
                    this.instellingService.set(this.currentUser.person.id, this.VANDAAG_SCHERM_ALGEMEEN, n).then((function() {}
                    ))
                }
                ,
                n.prototype.applyPrivileges = function(n) {
                    var t = this;
                    return i.filter(n, (function(n) {
                        return !!e.isDefined(n.Privilege) && (t.currentUser.hasPrivilege(n.Privilege, s.a.Read) || n.Privilege === c.a.NoPrivilege)
                    }
                    ))
                }
                ,
                n.prototype.showInvalidTimezoneToast = function() {
                    var n = this;
                    e.isUndefined(this.$scope.hideInvalidTimezoneToast) && (this.applicationService.createSessionCookie(this.HIDE_INVALID_TIMEZONE, !0),
                    this.schoolConfiguratieService.getSchoolinformatie().then((function(e) {
                        var t = -1 * e.OffsetLokaleTijdMetUTCInMinuten;
                        (new Date).getTimezoneOffset() !== t && n.applicationService.showMessage("Voor een goede werking van Magister moet het apparaat ingesteld zijn op de tijdzone '" + e.IANATijdZoneNaam + "'.", o.j.ERROR, 1e4, "Afwijkende tijdzone geconstateerd!")
                    }
                    )))
                }
                ,
                n.prototype.applyGroepFilter = function(n) {
                    var t = this;
                    return i.filter(n, (function(n) {
                        if (!e.isDefined(n.roles)) {
                            var a = i.find(t.vandaagDefaults.vandaagSchermAlgemeen, (function(e) {
                                return n.Directive === e.Directive && n.Titel === e.Titel
                            }
                            ));
                            Object(r.w)(a) || (n.roles = a.roles)
                        }
                        return t.currentUser.isInRoles(n.roles, l.a.One)
                    }
                    ))
                }
                ,
                n.$inject = ["$q", "$scope", "applicationService", "instellingService", "vandaagDefaults", "currentUser", "tabService", "schoolConfiguratieService", "profielResource", "oppMenuService"],
                n
            }()
        }
        ).call(this, t(2), t(4), t(16))
    }
}]);
