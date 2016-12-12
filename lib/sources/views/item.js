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

goog.provide( 'todomvc.views.Item' );

goog.require( 'goog.dom' );

goog.require( 'zz.views.FEBase' );
goog.require( 'todomvc.templates.item' );
goog.require( 'todomvc.enums.DataAction' );
goog.require( 'zz.environment.services.MVCTree' );
/**
 * Item view.
 * @extends {zz.views.FEBase}
 * @constructor
 */
todomvc.views.Item = function( ){

    goog.base( this, todomvc.templates.item.default, todomvc.templates.item.dataset  );
};
goog.inherits( todomvc.views.Item, zz.views.FEBase );
goog.addSingletonGetter( todomvc.views.Item );
zz.environment.services.MVCTree.registry.setView( 'item', todomvc.views.Item );

/**
 *
 * @param {zz.controllers.events.Action} e
 * @return {boolean}
 * @private
 */
todomvc.views.Item.prototype.isActionCompleteItem = function( e ){

    return e.elements[ 0 ].getAttribute( todomvc.enums.DataAction.COMPLETE ) > 0;
};

/**
 *
 * @param {zz.controllers.events.Action} e
 * @return {boolean}
 * @private
 */
todomvc.views.Item.prototype.isActionRemoveItem = function( e ){

    return e.elements[ 0 ].getAttribute( todomvc.enums.DataAction.REMOVE ) > 0;
};