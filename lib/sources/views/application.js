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

goog.provide( 'todomvc.views.Application' );

goog.require( 'goog.dom' );

goog.require( 'zz.views.FEBase' );
goog.require( 'todomvc.templates.application' );
goog.require( 'zz.environment.services.MVCTree' );
/**
 * Application view.
 * @extends {zz.views.FEBase}
 * @constructor
 */
todomvc.views.Application = function( ){

    goog.base( this, todomvc.templates.application.default );
};
goog.inherits( todomvc.views.Application, zz.views.FEBase );
goog.addSingletonGetter( todomvc.views.Application );

/**
 *
 * @param {zz.controllers.events.Action} e
 * @return {boolean}
 * @private
 */
todomvc.views.Application.prototype.isActionCompleteAll = function( e ){

    return e.elements[ 0 ].getAttribute( todomvc.enums.DataAction.COMPLETE_ALL ) > 0;
};

/**
 *
 * @param {zz.controllers.events.Action} e
 * @return {boolean}
 * @private
 */
todomvc.views.Application.prototype.isActionRemoveCompleted = function( e ){

    return e.elements[ 0 ].getAttribute( todomvc.enums.DataAction.REMOVE_COMPLETED ) > 0;
};