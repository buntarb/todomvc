// Copyright 2016 Artem Lytvynov <buntarb@gmail.com>. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @license Apache-2.0
 * @copyright Artem Lytvynov <buntarb@gmail.com>
 */

goog.provide( 'todomvc.controllers.Application' );

goog.require( 'zz.app.controllers.FEBaseApplication' );
goog.require( 'todomvc.views.Application' );

/**
 * Application controller.
 * @param {todomvc.models.Application} model
 * @param {todomvc.views.Application} view
 * @param opt_dom
 * @constructor
 * @extends {zz.app.controllers.FEBaseApplication}
 */
todomvc.controllers.Application = function( model, view, opt_dom ){

    goog.base( this, model, view, opt_dom );
};
goog.inherits(

    todomvc.controllers.Application,
    zz.app.controllers.FEBaseApplication );

/**
 *  @override
 */
todomvc.controllers.Application.prototype.setupListenersInternal = function( ){};

/**
 *  @override
 */
todomvc.controllers.Application.prototype.setupModelInternal = function( ){

    this.getModel( ).createLast( [

        '',
        false,
        undefined,
        undefined,
        undefined,
        undefined,
        true
    ] );
};
