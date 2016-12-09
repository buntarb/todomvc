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

goog.provide( 'todomvc.config' );

goog.require( 'zz.environment.services.Environment' );
goog.require( 'zz.app.services.FEBaseRouter' );

goog.require( 'todomvc.controllers.Item' );

goog.require( 'todomvc.views.Item' );


todomvc.config = function( ){


    zz.app.services.FEBaseRouter.getInstance( )

        .when( '', undefined, undefined, function( ){

            zz.app.services.FEBaseRouter.getInstance( ).setFragment( '/' );
        } )
        .when( '/active/', undefined, undefined, function( ){

            zz.app.services.FEBaseRouter.getInstance( ).setFragment( '/active' );
        } )
        .when( '/completed/', undefined, undefined, function( ){

            zz.app.services.FEBaseRouter.getInstance( ).setFragment( '/completed' );
        } )
        .when( '/active', undefined, todomvc.controllers.Item )
        .when( '/completed', undefined, todomvc.controllers.Item )

        .otherwise( '/' )
        .bootstrap( );
};