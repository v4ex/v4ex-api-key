/* Copyright (c) V4EX Inc. SPDX-License-Identifier: GPL-3.0-or-later */

// Purpose: Provide CLI command PublicKey to control PublicKey in database.


/**
 * @param {*} PublicKey (optional)
 * @param {*} mongoose (optional)
 * @param {*} modelName (optional)
 * @param {*} env (optional)
 */
 module.exports = ({ PublicKey, mongoose, modelName, env }) => {
  PublicKey = PublicKey || require('../models/public-key')({ mongoose, modelName, env }).PublicKey

  const { program } = require('commander')

  const done = () => {
    PublicKey.base.connection.close()
  }

  program.command('PublicKey')
         .description('control PublicKey model in database')
         .option('--drop', 'Drop PublicKey model collection in database')
         .action(function(options) {
           if (options.drop) {
            PublicKey.collection.drop(done)
           } else {
             done()
           }
         })

}
