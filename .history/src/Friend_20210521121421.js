import React from 'react';

const Friend = () => {
    return (
        <div className="friend">
            <form>
                <h3>Enter a Friend!</h3>
                <fieldset className="form-group">
                    <label>Friend's Name:</label>
                    <input
                        type="text"
                        ref="name"
                        name="name"
                        className="form-control"
                    />
                </fieldset>

                <fieldset className="form-group">
                    <label>Friend's Age:</label>
                    <input
                        type="text"
                        ref="age"
                        name="age"
                        className="form-control"
                    />
                </fieldset>
                <button className="btn btn-success" type="submit">
                    Save Friend
                    </button>
            </form>

        </div>
            </div >
        );
    }
}
            
        </div >
    );
};

export default Friend;