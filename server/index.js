const express = require('express');
const zod = require('zod');

const app = express();

const validateInput = (input) => {
    const schema = zod.object({
        email: zod.string().email(),
        password: zod.string().min(6)
    });

    return schema.safeParse(input);
};

app.get("/login", express.json(), function(req, res) {
    const inputs = req.body;
    const response = validateInput(inputs);

    
    // Further logic for valid inputs
});
// Start the server
const PORT = 3000;
app.listen(process.env.PORT || 3000, function(){
    console.log("Server started");
});


