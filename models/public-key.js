/* Copyright (c) V4EX Inc. SPDX-License-Identifier: GPL-3.0-or-later */

// Purpose: Provide PublicKey, PublicKeySchema instances.


module.exports = ({ mongoose, modelName, env }) => {
  mongoose = mongoose || require('../mongoose')({ env })
  modelName = modelName || 'PublicKey'

  let PublicKey, PublicKeySchema

  if (mongoose.modelNames().includes(modelName)) {
    PublicKey = mongoose.model(modelName)
    PublicKeySchema = PublicKey.schema
  } else {
    const Schema = mongoose.Schema
    PublicKeySchema = new Schema({
      key: { type: String, require: true, immutable: true }
    })
    PublicKey = mongoose.model(modelName, PublicKeySchema)
  }


  return {
    PublicKey,
    PublicKeySchema
  }
}
