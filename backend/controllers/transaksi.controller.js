const db = require("../models/bundle.model.js");

exports.getAllTransaksi = (req, res) => {
  db.transaksi
    .findAll({
      attributes: ["id", "trs_number", "createdAt"],
      include: [
        {
          model: db.transaksi_detail,
          attributes: ["id", "qty"],
          include: [
            {
              model: db.produk,
              attributes: ["id", "title", "image", "price", "url"],
              include: [
                {
                  model: db.kategori,
                  attributes: ["name"],
                },
              ],
            },
          ],
        },
      ],
    })
    .then(async (result) => {
      if (result.length > 0) {
        const dataTransaksi = await result.map((item, index) => {
          const detailItem = item.transaksi_details.map((_item, _index) => {
            return {
              id: _item.id,
              produk_id: _item.produk_id,
              title: _item.produk.title,
              image: _item.produk.image,
              price: _item.produk.price,
              url: _item.produk.url,
              qty: _item.qty,
              kategori: _item.produk.kategori.name,
            };
          });
          return {
            id: item.id,
            trs_number: item.trs_number,
            createdAt: item.createdAt,
            details: detailItem,
          };
        });
        res.send({
          code: 200,
          message: "OK",
          data: dataTransaksi,
        });
      } else {
        res.status(404).send({
          code: 404,
          message: "Belum ada data transaksi",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        code: 500,
        message: "Error > " + err,
      });
    });
};

exports.getOneTransaksi = async (req, res) => {
  const id = req.params.id;
  const t = await db.sequelize.transaction();

  try {
    const result = await db.transaksi.findOne({
      where: {
        id: id,
      },
      attributes: ["id", "trs_number", "createdAt"],
      include: [
        {
          model: db.transaksi_detail,
          attributes: ["id", "qty"],
          include: [
            {
              model: db.produk,
              attributes: ["id", "title", "image", "price", "url"],
              include: [
                {
                  model: db.kategori,
                  attributes: ["name"],
                },
              ],
            },
          ],
        },
      ],
    }, { transaction: t });

    if (!result) {
      throw new Error("data transaksi tidak ditemukan")
    }

    const detailItem = await result.transaksi_details.map((_item, _index) => {
      return {
        id: _item.id,
        produk_id: _item.produk.id,
        title: _item.produk.title,
        image: _item.produk.image,
        price: _item.produk.price,
        url: _item.produk.url,
        qty: _item.qty,
        kategori: _item.produk.kategori.name,
      };
    });

    res.send({
      code: 200,
      message: "OK",
      data: {
        id: result.id,
        trs_number: result.trs_number,
        createdAt: result.createdAt,
        details: detailItem,
      },
    });
    
    await t.commit();
  } catch (error) {
    await t.rollback();
    res.status(500).send({
      code: 500,
      message: "Error > " + error,
    });
  }
};

exports.getKas = (req, res) => {
  const trsNumber = req.params.trs_number;
  const transaction = this.getAllTransaksi(trsNumber);

  db.kas
    .findAll({
      where: {
        trs_number: trsNumber,
      },
    })
    .then((result) => {
      if (result.length > 0) {
        let totalValue = 0;
        transaction.items.forEach((item) => {
          const itemValue = item.price * item.qty;
          totalValue += itemValue;
        });

        res.send(`Total value of transaction ${trsNumber} is ${totalValue}`);
        res.send({
          code: 200,
          message: "OK",
          data: result,
        });
      } else {
        res.status(404).send({
          code: 404,
          message: "Data kas tidak ditemukan",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        code: 500,
        message: "Error > " + err,
      });
    });
  console.log(transaction);
};
