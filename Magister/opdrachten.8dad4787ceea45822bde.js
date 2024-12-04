(window.webpackJsonp = window.webpackJsonp || []).push([[11], {
    104: function(e, t, n) {
        "use strict";
        n.d(t, "a", (function() {
            return s
        }
        ));
        var r, i = function() {
            function e(e, t) {
                this.uris = t;
                var n = globalSettings.apiHost + "api/";
                this.detailResource = e(n + this.uris.root + "/:bronId", {
                    persoonId: "@persoonId",
                    bronId: "@Id"
                }, {
                    update: {
                        method: "PUT"
                    }
                }),
                this.rootResource = e(n + this.uris.root, {
                    persoonId: "@persoonId",
                    path: "@parentId",
                    bronId: "@bronId"
                }),
                this.rootItemsResource = e(n + this.uris.rootItems, {
                    persoonId: "@persoonId",
                    path: "@parentId",
                    bronId: "@bronId"
                }, {
                    save: {
                        method: "POST"
                    }
                }),
                this.mapItemsResource = e(n + this.uris.mapItems, {
                    persoonId: "@persoonId",
                    path: "@parentId",
                    bronId: "@bronId"
                }, {
                    save: {
                        method: "POST"
                    }
                }),
                this.downloadResource = e(n + this.uris.download, {
                    bronId: "@bronId"
                })
            }
            return e.prototype.root = function(e, t, n) {
                return this.rootResource.execute({
                    persoonId: e,
                    parentId: t,
                    bronId: n
                }).$promise
            }
            ,
            e.prototype.rootItems = function(e, t, n, r) {
                return this.rootItemsResource.execute({
                    persoonId: t,
                    uniqueId: n,
                    bronId: r
                }).$promise
            }
            ,
            e.prototype.saveRootItem = function(e, t) {
                var n = {
                    persoonId: t
                };
                return 0 === e.Id && e.UniqueId ? n.uniqueId = e.UniqueId : n.bronId = e.Id,
                this.rootItemsResource.save(n, e).$promise
            }
            ,
            e.prototype.saveItem = function(e, t, n) {
                var r = {
                    persoonId: t,
                    mapId: n
                };
                return 0 === e.Id && e.UniqueId ? r.uniqueId = e.UniqueId : r.bronId = e.Id,
                this.mapItemsResource.save(r, e).$promise
            }
            ,
            e.prototype.updateDetail = function(e, t, n) {
                return this.detailResource.update({
                    persoonId: t,
                    bronId: n
                }).$promise
            }
            ,
            e.prototype.download = function(e, t) {
                return this.detailResource.execute({
                    bronId: t
                }).$promise
            }
            ,
            e
        }(), o = (r = function(e, t) {
            return (r = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var n in t)
                    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
            }
            )(e, t)
        }
        ,
        function(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
            function n() {
                this.constructor = e
            }
            r(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        ), s = function(e) {
            function t(t) {
                return e.call(this, t, {
                    root: "documenten/onedriveforbusiness",
                    rootItems: "documenten/onedriveforbusiness/items",
                    map: "documenten/onedriveforbusiness/mappen/:mapId",
                    mapItems: "documenten/onedriveforbusiness/mappen/:mapId/items",
                    detail: "documenten/onedriveforbusiness/documenten/:documentId",
                    download: "documenten/onedriveforbusiness/documenten/:documentId/download",
                    toLocal: "documenten/onedriveforbusiness/documenten/:documentId/tolocal",
                    redirect: "documenten/onedriveforbusiness/documenten/:documentId/redirect"
                }) || this
            }
            return o(t, e),
            t.$inject = ["$resource", t],
            t
        }(i)
    },
    576: function(e, t, n) {
        "use strict";
        n.r(t),
        function(e) {
            n.d(t, "opdrachtenAMD", (function() {
                return u
            }
            ));
            var r = n(104)
              , i = n(99)
              , o = n(577)
              , s = n(578)
              , a = n(579)
              , c = n(581)
              , d = n(583)
              , l = n(585)
              , p = n(586)
              , u = e.module("OpdrachtenAMD", []);
            u.controller("opdrachtenOverzichtController", o.a.$inject).controller("opdrachtenDetailsController", s.a.$inject),
            u.service("oneDriveForBusinessResource", r.a.$inject).service("bronHelper", i.a.$inject).service("cdsUploadService", p.a.$inject),
            u.directive("smOpdrachtenFileSelect", a.a.$inject).directive("smOpdrachtenSelectieFilter", c.a.$inject).directive("smOpdrachtenVersiesDirective", d.a.$inject),
            u.factory("opdrachtenVersieValidator", (function() {
                return new l.a
            }
            ))
        }
        .call(this, n(2))
    },
    577: function(e, t, n) {
        "use strict";
        (function(e, r, i) {
            n.d(t, "a", (function() {
                return s
            }
            ));
            var o = n(124)
              , s = function() {
                function t(e, t, n, r, i, o) {
                    this.$routeParams = e,
                    this.$scope = t,
                    this.$location = n,
                    this.currentUser = r,
                    this.opdrachtenService = i,
                    this.tabService = o,
                    t.tabState = this.tabService.tabState,
                    this.tabService.subscribeTabAdded(this.tabAdded, this),
                    this.initialize()
                }
                return t.prototype.tabAdded = function(e) {
                    "idWeergave" === e.id && this.tabService.openTab(e)
                }
                ,
                t.prototype.initialize = function() {
                    var t = this;
                    this.anonymousRouteParams = this.$routeParams,
                    this.$scope.opdrachten = null,
                    this.$scope.vakken = [],
                    this.$scope.rijHoogte = "normaal",
                    this.$scope.selectedOpdracht = null,
                    this.opdrachten = null,
                    this.persoonId = this.currentUser.relatedPersons.current.id,
                    this.initialOpdrachtStatus = e.isDefined(this.anonymousRouteParams.filter) ? decodeURIComponent(this.anonymousRouteParams.filter) : null,
                    this.$scope.getBeoordeling = function(e) {
                        return t.getBeoordeling(e)
                    }
                    ,
                    this.$scope.$on("OPDRACHTEN_CHANGE_ROW_HEIGHT", (function(n, r) {
                        e.isDefined(r) && null !== r && (t.$scope.rijHoogte = r.name.toLowerCase())
                    }
                    )),
                    this.$scope.$on("OPDRACHTEN_FILTER_VAK", (function(n, r) {
                        e.isDefined(r) && null !== r && t.setSelectedVak(r)
                    }
                    )),
                    this.$scope.$on("OPDRACHTEN_FILTER_AANMELDING", (function(n, r) {
                        e.isDefined(r) && null !== r && t.setSelectedAanmelding(r)
                    }
                    )),
                    this.$scope.$on("OPDRACHTEN_FILTER_STATUS", (function(n, r) {
                        e.isDefined(r) && null !== r && t.setSelectedStatus(r)
                    }
                    )),
                    this.$scope.selectOpdracht = function(e) {
                        return t.selectOpdracht(e)
                    }
                }
                ,
                t.prototype.getBeoordeling = function(e) {
                    var t = null;
                    return null != e.Beoordeling && void 0 !== e.Beoordeling && (t = e.Beoordeling),
                    t
                }
                ,
                t.prototype.setSelectedVak = function(e) {
                    this.$scope.selectedVak = e,
                    this.filterOpdrachten()
                }
                ,
                t.prototype.setSelectedStatus = function(e) {
                    this.selectedStatus = e,
                    this.filterOpdrachten()
                }
                ,
                t.prototype.setSelectedAanmelding = function(t) {
                    var n = this
                      , i = 0
                      , s = 0
                      , a = 0;
                    this.$scope.selectedAanmelding = t;
                    var c = r(this.toCrossBrowserDateString("" + t.begin))
                      , d = r(this.toCrossBrowserDateString("" + t.einde));
                    this.opdrachtenService.getAll(this.persoonId, c, d, o.a.alle, i, 250).then((function(t) {
                        if (e.isDefined(t.Items) && null !== t.Items && e.isDefined(t.TotalCount) && null !== t.TotalCount) {
                            n.handleOpdrachtenResponse(t, !0),
                            a += t.Items.length,
                            s = t.TotalCount;
                            for (var r = 1; a < s && r < 20; r++)
                                i += 250,
                                n.opdrachtenService.getAll(n.persoonId, c, d, o.a.alle, i, 250).then((function(t) {
                                    e.isDefined(t.Items) && null !== t.Items && n.handleOpdrachtenResponse(t, !1)
                                }
                                )),
                                a += 250 * r
                        }
                    }
                    ))
                }
                ,
                t.prototype.toCrossBrowserDateString = function(e) {
                    return e.replace("0000Z", "Z")
                }
                ,
                t.prototype.handleOpdrachtenResponse = function(e, t) {
                    var n = this.opdrachtenService.assignStatus(e.Items);
                    if (n = this.opdrachtenService.assignOverdue(n),
                    t ? (this.$scope.vakken = this.opdrachtenService.getVakkenFromOpdrachten(n),
                    n = i.sortBy(n, "InleverenVoor"),
                    this.$scope.opdrachten = n,
                    this.opdrachten = n,
                    this.filterOpdrachten()) : (this.$scope.vakken = i.union(this.$scope.vakken, this.opdrachtenService.getVakkenFromOpdrachten(n)),
                    this.opdrachten = i.union(this.opdrachten, n),
                    this.opdrachten = i.sortBy(this.opdrachten, "InleverenVoor"),
                    this.$scope.opdrachten = this.opdrachten),
                    this.$scope.$broadcast("OPDRACHTEN_VAKKEN_RESET", this.$scope.vakken),
                    null !== this.initialOpdrachtStatus) {
                        var r = void 0;
                        switch (this.initialOpdrachtStatus) {
                        case "alle":
                            r = o.a.alle;
                            break;
                        case "ingeleverd":
                            r = o.a.ingeleverd;
                            break;
                        case "openstaand":
                            r = o.a.openstaand;
                            break;
                        case "beoordeeld":
                            r = o.a.beoordeeld;
                            break;
                        case "geen":
                            r = o.a.geen;
                            break;
                        default:
                            r = o.a.alle
                        }
                        this.initialOpdrachtStatus = null,
                        this.$scope.$broadcast("OPDRACHTEN_SET_FILTER_STATUS", o.a.geen),
                        this.$scope.$broadcast("OPDRACHTEN_SET_FILTER_STATUS", r)
                    }
                    this.filterOpdrachten()
                }
                ,
                t.prototype.filterOpdrachten = function() {
                    var e = this;
                    null != this.opdrachten && (this.$scope.opdrachten = i.filter(this.opdrachten, (function(t) {
                        return "Alle vakken" === e.$scope.selectedVak || t.Vak === e.$scope.selectedVak
                    }
                    )),
                    this.selectedStatus !== o.a.alle && (this.$scope.opdrachten = i.filter(this.$scope.opdrachten, (function(t) {
                        return e.selectedStatus === o.a.afgesloten ? t.Afgesloten : e.selectedStatus === t.OpdrachtStatus
                    }
                    ))))
                }
                ,
                t.prototype.selectOpdracht = function(e) {
                    this.$location.path("/elo/opdrachten/" + e)
                }
                ,
                t.$inject = ["$routeParams", "$scope", "$location", "currentUser", "opdrachtenService", "tabService", t],
                t
            }()
        }
        ).call(this, n(2), n(16), n(4))
    },
    578: function(e, t, n) {
        "use strict";
        (function(e, r, i) {
            n.d(t, "a", (function() {
                return d
            }
            ));
            var o = n(6)
              , s = n(9)
              , a = n(7)
              , c = n(1)
              , d = function() {
                function t(e, t, n, r, i, s, c, d, l, p) {
                    this.$routeParams = e,
                    this.$scope = t,
                    this.$timeout = n,
                    this.$location = r,
                    this.currentUser = i,
                    this.opdrachtenService = s,
                    this.opdrachtenVersieValidator = c,
                    this.applicationService = d,
                    this.tabService = l,
                    this.$sce = p,
                    this.dirty = !1,
                    this.heeftSchrijfRechten = this.currentUser.hasPrivilege(o.a.EloOpdracht, a.a.Create),
                    t.tabState = this.tabService.tabState,
                    this.tabService.subscribeTabAdded(this.tabAdded, this),
                    this.initialize()
                }
                return t.prototype.tabAdded = function(e) {
                    "idVersies" === e.id && this.tabService.openTab(e)
                }
                ,
                t.prototype.initialize = function() {
                    var t = this;
                    this.anonymousRouteParams = this.$routeParams,
                    this.$scope.returnUrl = e.isDefined(this.anonymousRouteParams.returnUrl) ? decodeURIComponent(this.anonymousRouteParams.returnUrl) : null,
                    this.persoonId = this.currentUser.relatedPersons.current.id,
                    this.opdrachtId = parseInt(this.$routeParams.opdrachtId, c.b),
                    this.$scope.$on("OPDRACHT_SELECT_VERSIE", (function(e, n) {
                        return t.updateVersie(e, n)
                    }
                    )),
                    this.$scope.editOpdracht = function() {
                        return t.editOpdracht()
                    }
                    ,
                    this.$scope.sendOpdracht = function() {
                        return t.sendOpdracht()
                    }
                    ,
                    this.$scope.deleteAttachment = function(e) {
                        return t.deleteAttachment(t.$scope, e)
                    }
                    ,
                    this.$scope.terug = function() {
                        return t.terug()
                    }
                    ,
                    this.$scope.onFileUploaded = function(e, n, r) {
                        return t.onFileUploaded(e, n, r)
                    }
                    ,
                    this.$scope.onFileUploadStarted = function(e, n, r) {
                        return t.onFileUploadStarted(e, n, r)
                    }
                    ,
                    this.$scope.onFileUploadErrored = function() {
                        return t.uploadStop()
                    }
                    ,
                    this.$scope.getContentUri = function(e) {
                        return t.getContentUri(e)
                    }
                    ,
                    this.$scope.isDirty = function() {
                        return t.isDirty()
                    }
                    ,
                    this.$scope.$on("OPDRACHT_UPLOAD_FILE_COMPLETE", (function(e, n) {
                        return t.uploadFileComplete(e, t.$scope, n)
                    }
                    )),
                    this.$scope.getLinkType = function(e) {
                        return t.getLinkType(e)
                    }
                    ,
                    this.$scope.trustAsHtml = function(e) {
                        return t.trustAsHtml(e)
                    }
                    ,
                    this.ladenOpdracht(!0),
                    this.$scope.isUploading = !1
                }
                ,
                t.prototype.getLinkType = function(e) {
                    return this.IsAttachmentWithScorm(e) ? "Scorm" : "Standard"
                }
                ,
                t.prototype.ladenOpdracht = function(e) {
                    var t, n = this;
                    void 0 === e && (e = !1),
                    this.$scope.foldOpdracht = !1,
                    this.$scope.isSending = !1,
                    this.opdrachtenService.getById(this.persoonId, this.opdrachtId).then((function(i) {
                        t = r.findWhere(i.VersieNavigatieItems, {
                            Omschrijving: i.LaatsteOpdrachtVersienummer.toString()
                        }),
                        n.initieelOpdracht = n.opdrachtenService.assignStatusDetail(i),
                        n.$scope.opdracht = r.extend(n.initieelOpdracht, {
                            VersieNummer: parseInt(t.Omschrijving, c.b),
                            VersieId: t.Id
                        }),
                        n.$scope.magInleveren = i.MagInleveren && n.heeftSchrijfRechten && !n.containsAttachmentWithScorm(n.$scope.opdracht.Bijlagen),
                        n.$scope.opdracht.KanOpnieuwInleveren = i.OpnieuwInleveren,
                        e && !i.Afgesloten && n.autoStartOpdracht(),
                        e || n.$scope.$broadcast("OPDRACHT_VERVERSEN", n.$scope.opdracht),
                        n.bepaalFormStatus()
                    }
                    ))
                }
                ,
                t.prototype.autoStartOpdracht = function() {
                    var t = e.isDefined(this.$scope.opdracht.GestartOp) && null !== this.$scope.opdracht.GestartOp
                      , n = this.$scope.opdracht.StatusLaatsteOpdrachtVersie === Contracts.ELO.Opdrachten.Enums.OpdrachtStatus.NietGestart || this.$scope.opdracht.StatusLaatsteOpdrachtVersie === Contracts.ELO.Opdrachten.Enums.OpdrachtStatus.Geen;
                    !t && n && this.heeftSchrijfRechten && this.startOpdracht()
                }
                ,
                t.prototype.startOpdracht = function() {
                    var e = this
                      , t = this.mapToOpdrachtVersie();
                    t.GestartOp = new Date(i().format()),
                    t.Status = Contracts.ELO.Opdrachten.Enums.OpdrachtStatus.Gestart,
                    this.opdrachtenService.updateVersie(this.persoonId, t).then((function(t) {
                        e.ladenOpdracht()
                    }
                    ), (function() {
                        e.$scope.$broadcast("HIDE_API_PROGRESS_INDICATOR", "opdrachten")
                    }
                    ))
                }
                ,
                t.prototype.trustAsHtml = function(e) {
                    return this.$sce.trustAsHtml(e)
                }
                ,
                t.prototype.editOpdracht = function() {
                    this.$scope.magInleveren && (this.$scope.isEditable = !0,
                    this.$scope.foldOpdracht = !0,
                    this.$scope.opdracht.LeerlingBijlagen = [],
                    this.$scope.opdracht.LeerlingOpmerking = "",
                    this.$scope.attachments = [])
                }
                ,
                t.prototype.isDirty = function() {
                    return this.$scope.isEditable && (!Object(c.u)(this.$scope.opdracht.LeerlingOpmerking) || this.dirty)
                }
                ,
                t.prototype.getContentUri = function(e) {
                    return e || null
                }
                ,
                t.prototype.sendOpdracht = function() {
                    var e = this;
                    if (!this.$scope.isUploading && !this.$scope.isSending) {
                        this.$scope.isSending = !0;
                        if (this.$scope.opdracht.LeerlingBijlagen = this.$scope.attachments,
                        !this.opdrachtenVersieValidator.validateOpdrachtVersie(this.$scope.opdracht, []))
                            return this.applicationService.showMessage("Geen opmerking ingevuld of bijlagen toegevoegd.", s.j.WARNING, 5e3),
                            void (this.$scope.isSending = !1);
                        this.dirty = !1;
                        var t = this.mapToOpdrachtVersie()
                          , n = this.tabService.getTab("idVersies");
                        Object(c.w)(n) || this.tabService.openTab(n),
                        t.Id > 0 ? this.opdrachtenService.updateVersie(this.currentUser.relatedPersons.current.id, t).then((function() {
                            e.applicationService.showMessage("Opdracht ingeleverd", s.j.INFORMATION, 5e3),
                            e.ladenOpdracht()
                        }
                        )) : (t.GestartOp = new Date(i().format()),
                        t.Status = Contracts.ELO.Opdrachten.Enums.OpdrachtStatus.OpnieuwInleveren,
                        this.opdrachtenService.createVersie(this.currentUser.relatedPersons.current.id, t).then((function(n) {
                            t.Id = n.Id,
                            t.Status = n.Status,
                            e.opdrachtenService.updateVersie(e.currentUser.relatedPersons.current.id, t).then((function() {
                                e.applicationService.showMessage("Opdracht ingeleverd", s.j.INFORMATION, 5e3),
                                e.ladenOpdracht()
                            }
                            ))
                        }
                        ))),
                        this.$scope.isSending = !0
                    }
                }
                ,
                t.prototype.updateVersie = function(e, t) {
                    if (this.$scope.opdracht = r.extend(this.initieelOpdracht, {
                        BeoordeeldOp: t.BeoordeeldOp,
                        InleverenVoor: t.InleverenVoor,
                        DocentOpmerking: t.DocentOpmerking,
                        LeerlingOpmerking: t.LeerlingOpmerking,
                        LeerlingBijlagen: t.LeerlingBijlagen,
                        FeedbackBijlagen: t.FeedbackBijlagen,
                        IngeleverdOp: t.IngeleverdOp,
                        VersieNummer: t.VersieNummer,
                        VersieId: t.Id,
                        Status: t.Status
                    }),
                    this.$scope.opdracht.Beoordeling = t.Beoordeling,
                    !Object(c.w)(t)) {
                        var n = r.max(this.$scope.opdracht.VersieNavigatieItems, (function(e) {
                            return e.Omschrijving
                        }
                        ));
                        if (t.VersieNummer > parseInt(n.Omschrijving, c.b)) {
                            var i = {
                                Id: -1,
                                Links: null,
                                Omschrijving: t.VersieNummer.toString()
                            };
                            this.$scope.opdracht.VersieNavigatieItems.push(i),
                            this.$scope.opdracht.LaatsteOpdrachtVersienummer = t.VersieNummer,
                            this.$scope.opdracht.VersieNummer = t.VersieNummer
                        }
                    }
                    this.bepaalFormStatus(),
                    this.$scope.attachments = t.LeerlingBijlagen
                }
                ,
                t.prototype.bepaalFormStatus = function() {
                    this.$scope.isEditable = !1,
                    this.$scope.isLaatsteVersie = this.$scope.opdracht.LaatsteOpdrachtVersienummer === this.$scope.opdracht.VersieNummer,
                    this.currentUser.hasPrivilege(o.a.EloOpdracht, a.a.Update) && this.$scope.isLaatsteVersie && (this.$scope.createTitle = "Inleveren")
                }
                ,
                t.prototype.mapToOpdrachtVersie = function() {
                    return {
                        Id: this.$scope.opdracht.VersieId,
                        Links: this.$scope.opdracht.Links,
                        Titel: this.$scope.opdracht.Titel,
                        Vak: this.$scope.opdracht.Vak,
                        Status: this.$scope.opdracht.Status,
                        OpdrachtId: this.$scope.opdracht.Id,
                        LeerlingOpmerking: this.$scope.opdracht.LeerlingOpmerking,
                        DocentOpmerking: this.$scope.opdracht.DocentOpmerking,
                        LeerlingBijlagen: this.$scope.opdracht.LeerlingBijlagen,
                        FeedbackBijlagen: this.$scope.opdracht.FeedbackBijlagen,
                        GestartOp: this.$scope.opdracht.GestartOp,
                        InleverenVoor: this.$scope.opdracht.InleverenVoor,
                        IngeleverdOp: this.$scope.opdracht.IngeleverdOp,
                        Beoordeling: this.$scope.opdracht.Beoordeling,
                        BeoordeeldOp: this.$scope.opdracht.BeoordeeldOp,
                        VersieNummer: this.$scope.opdracht.VersieNummer,
                        IsTeLaat: this.$scope.opdracht.IsTeLaat
                    }
                }
                ,
                t.prototype.uploadFileComplete = function(e, t, n) {
                    var i = this;
                    this.uploadStop(),
                    r.where(t.attachments, {
                        Naam: n.Naam
                    }).length ? this.$timeout((function() {
                        var e = s.j.WARNING;
                        i.applicationService.showMessage("Het bestand is reeds toegevoegd.", e, 3e3)
                    }
                    ), 0) : this.$timeout((function() {
                        t.attachments.push(n),
                        i.dirty = !0
                    }
                    ), 0)
                }
                ,
                t.prototype.onFileUploaded = function(e, t, n) {
                    var r = {
                        ContentType: t.type,
                        Naam: t.name,
                        UniqueId: e
                    };
                    this.uploadFileComplete(void 0, this.$scope, r)
                }
                ,
                t.prototype.onFileUploadStarted = function(e, t, n) {
                    this.$scope.isUploading = !0,
                    this.$scope.$broadcast("SHOW_API_PROGRESS_INDICATOR", "opdrachten")
                }
                ,
                t.prototype.deleteAttachment = function(e, t) {
                    e.attachments.splice(t, 1)
                }
                ,
                t.prototype.terug = function() {
                    e.isDefined(this.$scope.returnUrl) && null != this.$scope.returnUrl ? this.$location.path(this.$scope.returnUrl) : this.$timeout((function() {
                        window.history.back()
                    }
                    ), 0)
                }
                ,
                t.prototype.uploadStop = function() {
                    this.$scope.isUploading = !1,
                    this.$scope.$broadcast("HIDE_API_PROGRESS_INDICATOR", "opdrachten")
                }
                ,
                t.prototype.containsAttachmentWithScorm = function(e) {
                    var t = this;
                    return e.some((function(e) {
                        return t.IsAttachmentWithScorm(e)
                    }
                    ))
                }
                ,
                t.prototype.IsAttachmentWithScorm = function(e) {
                    return e.BronSoort === Contracts.Bronnen.Enums.BronSoort.Scorm || e.BronSoort === Contracts.Bronnen.Enums.BronSoort.ScormMetWachtwoord
                }
                ,
                t.$inject = ["$routeParams", "$scope", "$timeout", "$location", "currentUser", "opdrachtenService", "opdrachtenVersieValidator", "applicationService", "tabService", "$sce", t],
                t
            }()
        }
        ).call(this, n(2), n(4), n(16))
    },
    579: function(e, t, n) {
        "use strict";
        (function(e, r) {
            n.d(t, "a", (function() {
                return c
            }
            ));
            var i = n(88)
              , o = n(1)
              , s = function(e, t, n, r) {
                return new (n || (n = Promise))((function(i, o) {
                    function s(e) {
                        try {
                            c(r.next(e))
                        } catch (e) {
                            o(e)
                        }
                    }
                    function a(e) {
                        try {
                            c(r.throw(e))
                        } catch (e) {
                            o(e)
                        }
                    }
                    function c(e) {
                        var t;
                        e.done ? i(e.value) : (t = e.value,
                        t instanceof n ? t : new n((function(e) {
                            e(t)
                        }
                        ))).then(s, a)
                    }
                    c((r = r.apply(e, t || [])).next())
                }
                ))
            }
              , a = function(e, t) {
                var n, r, i, o, s = {
                    label: 0,
                    sent: function() {
                        if (1 & i[0])
                            throw i[1];
                        return i[1]
                    },
                    trys: [],
                    ops: []
                };
                return o = {
                    next: a(0),
                    throw: a(1),
                    return: a(2)
                },
                "function" == typeof Symbol && (o[Symbol.iterator] = function() {
                    return this
                }
                ),
                o;
                function a(o) {
                    return function(a) {
                        return function(o) {
                            if (n)
                                throw new TypeError("Generator is already executing.");
                            for (; s; )
                                try {
                                    if (n = 1,
                                    r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r),
                                    0) : r.next) && !(i = i.call(r, o[1])).done)
                                        return i;
                                    switch (r = 0,
                                    i && (o = [2 & o[0], i.value]),
                                    o[0]) {
                                    case 0:
                                    case 1:
                                        i = o;
                                        break;
                                    case 4:
                                        return s.label++,
                                        {
                                            value: o[1],
                                            done: !1
                                        };
                                    case 5:
                                        s.label++,
                                        r = o[1],
                                        o = [0];
                                        continue;
                                    case 7:
                                        o = s.ops.pop(),
                                        s.trys.pop();
                                        continue;
                                    default:
                                        if (!(i = s.trys,
                                        (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                            s = 0;
                                            continue
                                        }
                                        if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                            s.label = o[1];
                                            break
                                        }
                                        if (6 === o[0] && s.label < i[1]) {
                                            s.label = i[1],
                                            i = o;
                                            break
                                        }
                                        if (i && s.label < i[2]) {
                                            s.label = i[2],
                                            s.ops.push(o);
                                            break
                                        }
                                        i[2] && s.ops.pop(),
                                        s.trys.pop();
                                        continue
                                    }
                                    o = t.call(e, s)
                                } catch (e) {
                                    o = [6, e],
                                    r = 0
                                } finally {
                                    n = i = 0
                                }
                            if (5 & o[0])
                                throw o[1];
                            return {
                                value: o[0] ? o[1] : void 0,
                                done: !0
                            }
                        }([o, a])
                    }
                }
            }
              , c = function() {
                function t(e, t, r, i) {
                    var o = this;
                    this.dialogService = e,
                    this.magisterLocale = t,
                    this.cdsUploadService = r,
                    this.loggingService = i,
                    this.template = n(580),
                    this.link = function(e, t, n) {
                        return o.linkFn(e, t, n)
                    }
                }
                return t.prototype.linkFn = function(e, t, n) {
                    var r = this;
                    e.clickFileUpload = function() {
                        return r.clickFileUpload(e)
                    }
                    ,
                    e.uploadFile = function() {
                        return r.uploadFile(e)
                    }
                    ,
                    e.selectedFile = "selecteer bestand"
                }
                ,
                t.prototype.uploadFile = function(t) {
                    var n = e("#hiddenUploadButton");
                    if (Object(o.y)(n[0].files))
                        this.dialogService.showConfirm(this.magisterLocale.NotificationStrings.TITEL_FILE_UPLOAD_NOT_SUPPORTED, this.magisterLocale.NotificationStrings.FILE_UPLOAD_NOT_SUPPORTED, [i.a.Ok], (function(e) {}
                        ));
                    else if (1 === n[0].files.length) {
                        var r = n[0].files[0];
                        this.formData = new FormData,
                        this.formData.append("uploadedFile", r),
                        t.$broadcast("START-LOADING-FOREVER"),
                        t.$broadcast("SHOW_API_PROGRESS_INDICATOR", "opdrachten"),
                        this.uploadFileToCds(r, t)
                    }
                }
                ,
                t.prototype.uploadFileToCds = function(e, t) {
                    return s(this, void 0, void 0, (function() {
                        var n = this;
                        return a(this, (function(i) {
                            return this.cdsUploadService.getUploadRequest(e.name).then((function(i) {
                                i.success ? (n.loggingService.logCustomEvent("CDS: uploadLink success"),
                                n.cdsUploadService.uploadFile(e, i.uri).then((function(o) {
                                    t.targetFile = {
                                        Id: 0,
                                        Naam: e.name,
                                        ContentType: e.type,
                                        Datum: null,
                                        Grootte: 0,
                                        Url: "",
                                        UniqueId: null,
                                        BronSoort: Contracts.Bronnen.Enums.BronSoort.Bestand,
                                        Links: null
                                    },
                                    r.extend(t.targetFile, {
                                        UniqueId: i.storageId
                                    }),
                                    n.loggingService.logCustomEvent("CDS: Upload success"),
                                    t.$root.$broadcast("OPDRACHT_UPLOAD_FILE_COMPLETE", t.targetFile)
                                }
                                )).catch((function() {
                                    n.loggingService.logCustomEvent("CDS: Upload failed")
                                }
                                )).finally((function() {
                                    n.loadStopped(t)
                                }
                                ))) : (n.loggingService.logCustomEvent("CDS: uploadLink Failed(" + i.statusCode + ")"),
                                n.loadStopped(t))
                            }
                            )),
                            [2]
                        }
                        ))
                    }
                    ))
                }
                ,
                t.prototype.clickFileUpload = function(t) {
                    e("#hiddenUploadButton").val(""),
                    e("#hiddenUploadButton").click()
                }
                ,
                t.prototype.loadStopped = function(e) {
                    e.$broadcast("STOP-LOADING"),
                    e.$broadcast("HIDE_API_PROGRESS_INDICATOR", "opdrachten")
                }
                ,
                t.$inject = ["dialogService", "magisterLocale", "cdsUploadService", "loggingService", function(e, n, r, i) {
                    return new t(e,n,r,i)
                }
                ],
                t
            }()
        }
        ).call(this, n(12), n(4))
    },
    580: function(e, t) {
        e.exports = '<dna-button fill="clear" class="opdracht-bestand-toevoegen" data-ng-click="clickFileUpload()">Bestand toevoegen</dna-button>\r\n\x3c!-- met een ng change directive gaat het event niet af, vandaar deze standaard onchange... --\x3e\r\n<input id="hiddenUploadButton" data-ng-show="false" type="file"\r\n    onchange="angular.element(this).scope().uploadFile(this)" name="files" data-ng-model="selectedFile" />'
    },
    581: function(e, t, n) {
        "use strict";
        (function(e, r) {
            n.d(t, "a", (function() {
                return s
            }
            ));
            var i = n(124)
              , o = n(1)
              , s = function() {
                function t(t, r, i, o, s, a, c) {
                    var d = this;
                    this.$rootScope = t,
                    this.$timeout = r,
                    this.aanmeldingenService = i,
                    this.currentUser = o,
                    this.settingsService = s,
                    this.instellingService = a,
                    this.applicationService = c,
                    this.OPDRACHTEN_SETTINGS_KEY = "opdrachten_overzicht_instellingen",
                    this.OPDRACHTEN_SETTINGS_AANMELDING_KEY = "opdrachten_overzicht_instellingen_aanmelding",
                    this.initialize = function(t) {
                        t.fold = !1,
                        t.$on("OPDRACHTEN_VAKKEN_RESET", (function(n, r) {
                            e.isDefined(r) && null !== r && e.isUndefined(t.vakken) && (t.vakken = r,
                            d.$rootScope.$broadcast("OPDRACHTEN_FILTER_VAK", t.selectedVak))
                        }
                        )),
                        d.getSettings(t),
                        d.getAanmeldingen(t)
                    }
                    ,
                    this.template = n(582),
                    this.replace = !0,
                    this.link = function(e, t, n) {
                        return d.linkFn(e, t, n)
                    }
                }
                return t.prototype.linkFn = function(e, t, n) {
                    var r = this;
                    this.initialize(e),
                    e.selectVak = function(t) {
                        return r.selectVak(e, t.sender.value())
                    }
                    ,
                    e.selectAanmelding = function(t) {
                        return r.selectAanmelding(e, t)
                    }
                    ,
                    e.toggleStatus = function(t) {
                        return r.toggleStatus(e, +t.sender.value())
                    }
                    ,
                    e.$on("OPDRACHTEN_SET_FILTER_STATUS", (function(t, n) {
                        e.selectedStatus = n,
                        r.toggleStatus(e, e.selectedStatus)
                    }
                    )),
                    this.toggleStatus(e, e.selectedStatus),
                    e.blockFold = function() {
                        e.fold = !e.fold
                    }
                }
                ,
                t.prototype.getOmschrijving = function(e) {
                    var t;
                    return t = e.lesperiode ? e.lesperiode.code + " " + e.studie.code : "EX ".concat(e.studie.code),
                    e.profielen.length > 0 && (t += " (" + e.profielen.map((function(e) {
                        return e.code
                    }
                    )).join("/") + ")"),
                    t
                }
                ,
                t.prototype.getAanmeldingen = function(t) {
                    var n = this
                      , i = this.currentUser.relatedPersons.current.id.toString();
                    this.aanmeldingenService.getLeerlingAanmeldingen(Number.parseInt(i, 10)).then((function(i) {
                        var s;
                        if (r.each(i, (function(e) {
                            var t = Object(o.l)(new Date);
                            e.omschrijving = n.getOmschrijving(e),
                            Object(o.l)(e.begin) < t && Object(o.l)(e.einde) >= t && e.lesperiode && (s = e)
                        }
                        )),
                        t.aanmeldingen = i,
                        e.isDefined(s) && null !== s) {
                            var a = n.settingsService.getSettingVolatile(n.OPDRACHTEN_SETTINGS_AANMELDING_KEY, s.id);
                            n.selectAanmeldingByAanmelding(t, a)
                        }
                    }
                    ))
                }
                ,
                t.prototype.selectVak = function(e, t) {
                    e.selectedVak = t,
                    this.saveSettings(e),
                    this.$rootScope.$broadcast("OPDRACHTEN_FILTER_VAK", t)
                }
                ,
                t.prototype.selectAanmelding = function(e, t) {
                    this.selectAanmeldingByAanmelding(e, +t.sender.value())
                }
                ,
                t.prototype.selectAanmeldingByAanmelding = function(t, n) {
                    var i = r.find(t.aanmeldingen, (function(e) {
                        return e.id === n
                    }
                    ));
                    e.isUndefined(i) || null === i || (t.selectedAanmelding = i.id,
                    t.selectedAanmeldingOmschrijving = i.omschrijving,
                    this.settingsService.setSettingVolatile(this.OPDRACHTEN_SETTINGS_AANMELDING_KEY, i.id),
                    this.$rootScope.$broadcast("OPDRACHTEN_FILTER_AANMELDING", i))
                }
                ,
                t.prototype.toggleStatus = function(e, t) {
                    e.selectedStatus = t,
                    this.saveSettings(e),
                    this.$rootScope.$broadcast("OPDRACHTEN_FILTER_STATUS", t)
                }
                ,
                t.prototype.saveSettings = function(e) {
                    if (!Object(o.w)(e.selectedVak) && !Object(o.w)(e.selectedStatus)) {
                        var t = {
                            vak: e.selectedVak,
                            status: e.selectedStatus
                        };
                        this.settingsService.setSettingVolatile(this.OPDRACHTEN_SETTINGS_KEY, t)
                    }
                }
                ,
                t.prototype.getSettings = function(e) {
                    var t = this
                      , n = {
                        vak: "Alle vakken",
                        status: i.a.openstaand
                    }
                      , r = this.settingsService.getSettingVolatile(this.OPDRACHTEN_SETTINGS_KEY, n);
                    this.$timeout((function() {
                        e.selectedVak = r.vak,
                        t.$rootScope.$broadcast("OPDRACHTEN_FILTER_VAK", e.selectedVak),
                        e.selectedStatus = r.status,
                        t.$rootScope.$broadcast("OPDRACHTEN_FILTER_STATUS", +e.selectedStatus)
                    }
                    ))
                }
                ,
                t.$inject = ["$rootScope", "$timeout", "aanmeldingenService", "currentUser", "settingsService", "instellingService", "applicationService", function(e, n, r, i, o, s, a) {
                    return new t(e,n,r,i,o,s,a)
                }
                ],
                t
            }()
        }
        ).call(this, n(2), n(4))
    },
    582: function(e, t) {
        e.exports = '<div class="content">\r\n  <form method="post" action="#">\r\n\r\n    <div class="side-widget-dropdown">\r\n      <label>Vakken</label>\r\n      <div class="fancy-select">\r\n        <select id="selectVakken" class="select" data-kendo-drop-down-list="selectVakken" data-k-data-source="vakken"\r\n          data-k-on-change="selectVak(kendoEvent)" data-k-value-primitive="true" data-ng-model="selectedVak">\r\n        </select>\r\n      </div>\r\n    </div>\r\n\r\n    <div class="side-widget-dropdown">\r\n      <label>Schooljaar</label>\r\n      <div class="fancy-select">\r\n        <select id="selectAanmeldingen" class="select" data-kendo-drop-down-list="selectAanmeldingen"\r\n          data-k-data-source="aanmeldingen" data-k-data-value-field="\'id\'" data-k-data-text-field="\'omschrijving\'"\r\n          data-k-on-change="selectAanmelding(kendoEvent)" data-k-ng-model="selectedAanmelding"\r\n          data-k-value-primitive="true">\r\n        </select>\r\n      </div>\r\n    </div>\r\n\r\n    <div class="side-widget-dropdown">\r\n      <label>Status</label>\r\n      <div class="fancy-select">\r\n        <select id="selectStatus" class="select" data-kendo-drop-down-list="selectStatus"\r\n          data-k-on-change="toggleStatus(kendoEvent)" data-k-ng-model="selectedStatus" data-k-value-primitive="true">\r\n          <option value="0">Alle</option>\r\n          <option value="1">Ingeleverd</option>\r\n          <option value="2">Openstaand</option>\r\n          <option value="3">Beoordeeld</option>\r\n          <option value="5">Afgerond</option>\r\n        </select>\r\n      </div>\r\n    </div>\r\n\r\n  </form>\r\n</div>\r\n</div>'
    },
    583: function(e, t, n) {
        "use strict";
        (function(e, r, i) {
            n.d(t, "a", (function() {
                return o
            }
            ));
            var o = function() {
                function t(e, t, r, i) {
                    var o = this;
                    this.$routeParams = e,
                    this.$rootScope = t,
                    this.currentUser = r,
                    this.opdrachtenService = i,
                    this.template = n(584),
                    this.replace = !0,
                    this.link = function(e, t, n) {
                        return o.linkFn(e, t, n)
                    }
                }
                return t.prototype.linkFn = function(t, n, r) {
                    var i = this;
                    this.parentScope = t.$parent.$parent.$parent,
                    t.isEditMode = !1,
                    this.parentScope.$watch("isEditable", (function(n, r) {
                        e.isDefined(n) && null != n && (t.isEditMode = n)
                    }
                    )),
                    t.versies = [],
                    this.persoonId = this.currentUser.relatedPersons.current.id,
                    this.opdrachtId = this.$routeParams.opdrachtId,
                    t.$on("OPDRACHT_VERVERSEN", (function(e) {
                        return i.LadenVersies(t)
                    }
                    )),
                    t.$on("OPDRACHT_DESELECT_VERSIE", (function(e) {
                        t.selectedVersie = null
                    }
                    )),
                    this.LadenVersies(t),
                    this.inititalize(t)
                }
                ,
                t.prototype.LadenVersies = function(e) {
                    var t = this;
                    e.versies = [],
                    this.opdrachtenService.getById(this.persoonId, this.opdrachtId).then((function(n) {
                        r.each(n.VersieNavigatieItems, (function(o) {
                            var s = r.filter(o.Links, (function(e) {
                                return "Self" === e.Rel
                            }
                            ));
                            t.opdrachtenService.getVersie(s[0].Href).then((function(r) {
                                var o = r;
                                if (e.versies.push(o),
                                r.VersieNummer === n.LaatsteOpdrachtVersienummer)
                                    if (null !== r.IngeleverdOp && n.OpnieuwInleveren && i(n.InleverenVoor) >= i() && n.MagInleveren) {
                                        var s = {
                                            Id: -1,
                                            Links: null,
                                            Titel: null,
                                            Vak: null,
                                            Status: null,
                                            OpdrachtId: null,
                                            LeerlingOpmerking: null,
                                            DocentOpmerking: null,
                                            LeerlingBijlagen: null,
                                            FeedbackBijlagen: null,
                                            GestartOp: null,
                                            IngeleverdOp: null,
                                            InleverenVoor: n.InleverenVoor,
                                            Beoordeling: null,
                                            BeoordeeldOp: null,
                                            VersieNummer: r.VersieNummer + 1,
                                            IsTeLaat: null,
                                            VersieId: -1,
                                            KanOpnieuwInleveren: !0,
                                            OpdrachtStatus: null,
                                            IsOverdue: null,
                                            StatusLaatsteOpdrachtVersie: null,
                                            LaatsteOpdrachtVersienummer: null,
                                            Bijlagen: null,
                                            Docenten: null,
                                            VersieNavigatieItems: null,
                                            Omschrijving: null,
                                            OpnieuwInleveren: null,
                                            extraInfoField: null,
                                            Afgesloten: null,
                                            MagInleveren: !1
                                        };
                                        e.versies.push(s),
                                        t.selectVersie(e, t.$rootScope, s)
                                    } else
                                        t.selectVersie(e, t.$rootScope, r);
                                e.versies.sort((function(e, t) {
                                    return e.VersieNummer >= t.VersieNummer ? -1 : 1
                                }
                                ))
                            }
                            ))
                        }
                        ))
                    }
                    ))
                }
                ,
                t.prototype.inititalize = function(e) {
                    var t = this;
                    e.fold = !1,
                    e.selectVersie = function(n) {
                        t.selectVersie(e, t.$rootScope, n)
                    }
                }
                ,
                t.prototype.selectVersie = function(e, t, n) {
                    e.selectedVersie = n,
                    t.$broadcast("OPDRACHT_SELECT_VERSIE", n)
                }
                ,
                t.$inject = ["$routeParams", "$rootScope", "currentUser", "opdrachtenService", function(e, n, r, i) {
                    return new t(e,n,r,i)
                }
                ],
                t
            }()
        }
        ).call(this, n(2), n(4), n(16))
    },
    584: function(e, t) {
        e.exports = '<div class="versions opdracht-versions">\r\n  <ul>\r\n    <li data-ng-class="{\'selected\': selectedVersie.Id == versie.Id}" data-ng-repeat="versie in versies"\r\n      data-ng-click="selectVersie(versie)">\r\n      <a data-ng-hide="versie.KanInleveren">\r\n        <b data-ng-bind-template="Versie {{versie.VersieNummer}}"></b>\r\n         <span ng-if="versie.IngeleverdOp"><i>Ingeleverd op {{versie.IngeleverdOp | date:\'dd-MM-yy\'}}</i></span>\r\n         <span ng-if="!versie.IngeleverdOp"><i>Nog niet ingeleverd</i></span>\r\n      </a>\r\n      <a data-ng-show="versie.KanInleveren">\r\n        <b>Nieuwe versie</b><i>Inleveren voor {{versie.InleverenVoor | date:\'dd-MM-yy\'}}</i>\r\n      </a>\r\n    </li>\r\n  </ul>\r\n</div>'
    },
    585: function(e, t, n) {
        "use strict";
        n.d(t, "a", (function() {
            return r
        }
        ));
        var r = function() {
            function e() {}
            return e.prototype.validateOpdrachtVersie = function(e, t) {
                return this.validateComment(e.LeerlingOpmerking, t) || this.validateAttachments(e.LeerlingBijlagen, t)
            }
            ,
            e.prototype.validateComment = function(e, t) {
                var n = !0;
                return "" === (e = e || "") && (t.push("NO_COMMENT"),
                n = !1),
                n
            }
            ,
            e.prototype.validateAttachments = function(e, t) {
                var n = !0;
                return 0 === (e = e || []).length && (t.push("NO_ATTACHMENTS"),
                n = !1),
                n
            }
            ,
            e.$inject = [],
            e
        }()
    },
    586: function(e, t, n) {
        "use strict";
        n.d(t, "a", (function() {
            return r
        }
        ));
        var r = function() {
            function e(e, t) {
                this.$upload = e,
                this.$http = t
            }
            return e.prototype.getUploadRequest = function(e) {
                return this.$http.post("/api/bestanden/upload", {
                    name: e
                }).then((function(e) {
                    var t = e.status;
                    return {
                        storageId: e.data.storageId,
                        uri: e.data.uri,
                        success: !0,
                        statusCode: t
                    }
                }
                )).catch((function(e) {
                    return {
                        storageId: null,
                        uri: null,
                        success: !1,
                        statusCode: e.status
                    }
                }
                ))
            }
            ,
            e.prototype.uploadFile = function(e, t) {
                var n = {
                    url: t,
                    data: e,
                    method: "PUT",
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "x-ms-blob-type": "BlockBlob",
                        "x-ms-blob-content-type": e.type
                    }
                };
                return this.$upload.http(n)
            }
            ,
            e.$inject = ["$upload", "$http", e],
            e
        }()
    },
    92: function(e, t, n) {
        "use strict";
        n.d(t, "a", (function() {
            return r
        }
        ));
        var r = function() {
            function e() {}
            return e.Map = "map",
            e.Bestand = "bestand",
            e.Html = "html",
            e.Url = "url",
            e.DigitaalLesmateriaal = "digitaalLesmateriaal",
            e.Noordhoff = "noordhoff",
            e
        }()
    },
    95: function(e, t, n) {
        "use strict";
        n.d(t, "a", (function() {
            return i
        }
        ));
        var r = n(1)
          , i = function() {
            function e(e, t) {
                this.fullName = e,
                this.isFolder = t,
                this.decomposeFileName(e)
            }
            return e.prototype.decomposeFileName = function(e) {
                !Object(r.w)(e) && e.length > 0 && ("." === e.substr(e.length - 1, 1) || -1 === e.lastIndexOf(".") ? this.name = e : (this.extension = e.substr(e.lastIndexOf(".") + 1, e.length),
                this.name = e.substr(0, e.lastIndexOf("."))))
            }
            ,
            e
        }()
    },
    99: function(e, t, n) {
        "use strict";
        (function(e, r) {
            n.d(t, "a", (function() {
                return l
            }
            ));
            var i = n(93)
              , o = n(91)
              , s = n(1)
              , a = n(92)
              , c = n(95)
              , d = Contracts.Bronnen.Enums.BronType
              , l = function() {
                function t() {
                    this.videoExtensions = "mp4 avi 264 m2v vc1 yuv wmv f4v raw m2ts m3u8 ismv mov 3gpp 3gp 3g2 flv mkv m2v m1v mts ts trp mpg mpeg mp4 h264 mxf divx xvid vob asf",
                    this.audioExtensions = "aac aif aifc aiff au flac m4a mid midi mp3 mpa opus rmi snd wav",
                    this.IS_AANGEMELD_BIJ_KENNISNET_SESSIONCOOKIE_KEY = "isAangemeldBijKennisNet"
                }
                return t.prototype.getLink = function(e) {
                    switch (e.soort) {
                    case a.a.Url:
                        return e.url;
                    default:
                        return Object(s.m)(e.links, "download")
                    }
                }
                ,
                t.prototype.transformBronnen = function(t, n) {
                    var r = this;
                    return e.isUndefined(t) ? [] : t.map((function(e) {
                        return r.transformBron(e, n)
                    }
                    ))
                }
                ,
                t.prototype.transformBron = function(e, t) {
                    return {
                        id: e.id,
                        parentId: e.parentId,
                        type: this.determineBronType(e),
                        rootMapId: t,
                        naam: e.naam,
                        privilege: e.privilege,
                        contentType: e.contentType,
                        grootte: e.grootte,
                        url: e.url,
                        links: e.links,
                        soort: e.soort,
                        gemaaktOp: e.gemaaktOp,
                        gewijzigdOp: e.gewijzigdOp,
                        mediaType: this.getMediaType(e.naam, e.url)
                    }
                }
                ,
                t.prototype.transformBronDtoToBron = function(e, t) {
                    return {
                        id: e.Id,
                        parentId: e.ParentId,
                        type: e.Type,
                        rootMapId: t,
                        naam: e.Naam,
                        privilege: this.firstCharacterToLowerCase(Contracts.Bronnen.Enums.BronPrivilege[e.Privilege]),
                        contentType: e.ContentType,
                        grootte: e.Grootte,
                        url: null,
                        links: e.Links,
                        soort: this.firstCharacterToLowerCase(Contracts.Bronnen.Enums.BronSoort[e.BronSoort]),
                        gemaaktOp: e.GemaaktOp,
                        gewijzigdOp: e.GewijzigdOp,
                        mediaType: null
                    }
                }
                ,
                t.prototype.firstCharacterToLowerCase = function(e) {
                    return e.slice(0, 1).toLowerCase() + e.slice(1)
                }
                ,
                t.prototype.determineBronType = function(e) {
                    var t = d.Onbekend;
                    return e.soort === a.a.Map && (t = d.Map),
                    e.soort === a.a.Bestand && (t = d.Document),
                    e.soort === a.a.Url && (t = d.Link),
                    t
                }
                ,
                t.prototype.getMediaType = function(e, t) {
                    var n = new c.a(e,!1).extension
                      , r = i.a.Anders;
                    return Object(s.u)(n) || (-1 !== this.videoExtensions.indexOf(n) && (r = i.a.Video),
                    -1 !== this.audioExtensions.indexOf(n) && (r = i.a.Audio)),
                    Object(s.u)(t) || -1 === t.indexOf("www.youtube.com") || (r = i.a.YouTube),
                    r
                }
                ,
                t.prototype.isFolder = function(e) {
                    return e.soort === a.a.Map
                }
                ,
                t.prototype.isFile = function(e) {
                    return e.soort === a.a.Bestand
                }
                ,
                t.prototype.convertToTreeNodes = function(e) {
                    var t = this;
                    return r.map(e, (function(e) {
                        return t.convertToTreeNode(e)
                    }
                    ))
                }
                ,
                t.prototype.convertToTreeNode = function(t) {
                    var n = {
                        id: t.id,
                        text: t.naam,
                        data: t
                    };
                    return e.isArray(t.links) || (n.data.links = this.createLinksArray(t)),
                    n
                }
                ,
                t.prototype.convertToListItems = function(e) {
                    var t = this;
                    return r.map(e, (function(e) {
                        return t.convertToListItem(e)
                    }
                    ))
                }
                ,
                t.prototype.convertToListItem = function(t) {
                    var n = {
                        id: t.id,
                        text: t.naam,
                        data: t
                    };
                    return e.isArray(t.links) || (n.data.links = this.createLinksArray(t)),
                    n
                }
                ,
                t.prototype.createLinksArray = function(e) {
                    var t = [];
                    return this.addLink(e, t, "self"),
                    this.addLink(e, t, "download"),
                    this.addLink(e, t, "parent"),
                    this.addLink(e, t, "children"),
                    t
                }
                ,
                t.prototype.addLink = function(e, t, n) {
                    Object(s.k)(e.links, n) && t.push({
                        rel: n,
                        href: e.links[n].href
                    })
                }
                ,
                t.prototype.convertToBron = function(e) {
                    return r.map(e, (function(e) {
                        return e.data
                    }
                    ))
                }
                ,
                t.prototype.isBronInRecycleBin = function(e) {
                    return e.rootMapId === o.a.Prullenbak
                }
                ,
                t.prototype.isMedia = function(e) {
                    return !Object(s.w)(e.mediaType) && r.contains([i.a.Audio, i.a.Video, i.a.YouTube], e.mediaType)
                }
                ,
                t.$inject = [t],
                t
            }()
        }
        ).call(this, n(2), n(4))
    }
}]);
