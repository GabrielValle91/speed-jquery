module ShipmentsHelper
  def timeChanger(timefield)
    if !!timefield
      return timefield.strftime("%r")
    else
      return nil
    end
  end

  def dateChanger(datefield)
    if !!datefield
      return datefield.strftime("%D")
    else 
      return nil
    end
  end
end
