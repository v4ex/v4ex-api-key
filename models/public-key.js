/* Copyright (c) V4EX Inc. SPDX-License-Identifier: GPL-3.0-or-later */

// Purpose: Provide PublicKey, PublicKeySchema instances.


/**
 * @param {Object} {}
 *   - @param {*} mongoose (optional)
 *   - @param {*} modelName (optional)
 *   - @param {*} env (optional)
 * @param {*} IdentitySettings (optional)
 * @param {*} SessionSettings (optional)
 */
module.exports = ({ mongoose, modelName, env }, IdentitySettings, SessionSettings) => {
  const { Identity } = require('v4ex-api-identity/models/all-identity')(IdentitySettings || {})
  const { Session } = require('v4ex-api-login/models/session')(SessionSettings || {})
  
  mongoose = mongoose || require('../mongoose')({ env })
  modelName = modelName || 'PublicKey'

  let PublicKey, PublicKeySchema

  if (mongoose.modelNames().includes(modelName)) {
    PublicKey = mongoose.model(modelName)
    PublicKeySchema = PublicKey.schema
  } else {
    const Schema = mongoose.Schema
    PublicKeySchema = new Schema({
      identity: { type: mongoose.ObjectId, ref: Identity, require: true, immutable: true },
      key: { type: String, require: true, immutable: true },
      session: { type: mongoose.ObjectId, ref: Session, unique: true, sparse: true, immutable: true }
    })
    PublicKey = mongoose.model(modelName, PublicKeySchema)
  }


  return {
    PublicKey,
    PublicKeySchema
  }
}
